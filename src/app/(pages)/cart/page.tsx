"use client"
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "@/components/context/cartContext";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartResponse } from '@/interfaces/cart';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deleteItemCarActions } from './_actions/deleteItemCart.actions';







export default function Cart() {
    const [deletedItemId, setDeletedItemId] = useState<string | null>(null);
    const [deletedAll, setDeletedAll] = useState<boolean>(false);
    let { useCart, setUseCart, isLoading, getCartData } = useContext(CartContext);
    const [isUpdated, setIsUpdated] = useState<string | null>(null);

let detailsInput= useRef<HTMLInputElement|null>(null);
let cityInput = useRef<HTMLInputElement|null>(null);
let phoneInput =useRef<HTMLInputElement|null>(null);

    // const [deleteAll, setDeleteAll] = useState<{}>();



    async function deleteItem(prodId: string) {
        setDeletedItemId(prodId);
        const data:CartResponse = await deleteItemCarActions(prodId);
        if(data.status == 'success'){
            toast("your product is removed successfully ✅ ")
        }
        setUseCart(data);
        setDeletedItemId(null);
    }

    useEffect(() => {
        getCartData();
    }, []);

    

    async function ClearAllCart() {
        setDeletedAll(true);
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                method: "DELETE",
                headers: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmYyY2Y5ZTJkY2M3MTVlNGRmOTc0ZiIsIm5hbWUiOiJvbWFyIGtlbmF3eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3MzU5MzUzLCJleHAiOjE3NjUxMzUzNTN9.tTEuouh2ww88PdCuer_nM2Oib5MIBNF_17BNr0ElNAI"
                }
            });
        const data = await response.json();
        setDeletedAll(false);
        toast(<p className="text-gray-500 text-lg">Your cart is empty 🛒</p>    )
        setUseCart(null);
    }


    async function updateItemNumber(prodId:string,count:number){
        if(count == 0){
            null
        }else{
                    setIsUpdated(prodId);
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
             {
                method: "PUT",
                headers: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmYyY2Y5ZTJkY2M3MTVlNGRmOTc0ZiIsIm5hbWUiOiJvbWFyIGtlbmF3eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3MzU5MzUzLCJleHAiOjE3NjUxMzUzNTN9.tTEuouh2ww88PdCuer_nM2Oib5MIBNF_17BNr0ElNAI"
                ,"Content-Type": "application/json"
                },
                body:JSON.stringify({count})
            }
        )
        const data = await response.json();
        setUseCart(data)
        setIsUpdated(null);
        }
    }

async function checkoutOut(cartId:string) {
    const shippingAddress ={
        details: detailsInput.current?.value,
        phone:phoneInput.current?.value,
        city: cityInput.current?.value
    }
    

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId.trim()}?url=http://localhost:3000`,
        {
            headers: {
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmYyY2Y5ZTJkY2M3MTVlNGRmOTc0ZiIsIm5hbWUiOiJvbWFyIGtlbmF3eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3MzU5MzUzLCJleHAiOjE3NjUxMzUzNTN9.tTEuouh2ww88PdCuer_nM2Oib5MIBNF_17BNr0ElNAI"
                ,"Content-Type": "application/json"
                },
            method:"POST",
            body:JSON.stringify({shippingAddress})
        }
)

const data = await response.json();
console.log("CartId =>", `"${useCart?.cartId}"`);
console.log(data);

if(data.status == "success"){
    location.href=data.session.url
}


}







    return <>
        <h1 className="font-bolder text-3xl m-3 uppercase font-medium ">Shopping Cart</h1>
        <div className="prod p-9">
            <div className=" flex mb-3">
                {isLoading ||  useCart?.data?.products?.length == null ? <Loading></Loading> :
                    <div className="max-w-7/12 p-4">
                        {useCart?.data.products.filter((prod) => prod && prod.product && typeof prod.product !== "string")
                            .map((prod) =>
                                <div key={prod.product._id} className="border-b-2">
                                    <div className="main flex items-center">
                                        <Image className="p-3 rounded-2xl" src={prod.product.imageCover} alt={prod.product.title} width={200} height={200}></Image>
                                        <div className="text">
                                            <p>{prod.product.title}</p>
                                            <div className="more flex">
                                                <p className="pe-3 text-gray-400">{prod.product.brand.name}</p>
                                                <span> - </span>
                                                <p className="ps-3 text-gray-400">{prod.product.category.name}</p>
                                            </div>
                                            <div className="flex">
                                                <div className="counter flex items-center space-x-4 pt-5">
                                                    <Button disabled={prod.count ==1} onClick={()=>updateItemNumber(prod.product._id,prod.count-1)} className="bg-transparent border hover:bg-gray-200 cursor-pointer">
                                                        {isUpdated==prod.product._id?<Loader2 className='animate-spin text-black'></Loader2>:<Minus className="text-black"></Minus>}
                                                    </Button>
                                                    <p>{prod.count}</p>
                                                    <Button disabled={isUpdated ==prod.product._id} onClick={()=>updateItemNumber(prod.product._id,prod.count+1)} className="bg-transparent border hover:bg-gray-200 me-2 cursor-pointer">
                                                          {isUpdated==prod.product._id?<Loader2 className='animate-spin text-black'></Loader2>:<Plus className="text-black"></Plus>}
                                                    </Button>
                                                </div>
                                                <div onClick={() => deleteItem(prod.product._id)} className="remove ms-33 text-red-700 cursor-pointer pt-5 flex gap-2">
                                                    <Button disabled={deletedItemId == prod.product._id} className="bg-red-700 hover:bg-red-900">
                                                        {deletedItemId == prod.product._id ? <Loader2 className="animate-spin"></Loader2> : <Trash2></Trash2>} Delete Item</Button>
                                                </div>
                                            </div>
                                            <p className='pt-3 font-bold'>Price :<span className='font-light text-gray-500 ps-3'>{prod.price} EGP</span></p>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                }
                
                
                <div className="w-5/12 mx-auto mt-20">
                    <div className="border p-2 rounded-2xl">
                        <h2 className="capitalize ps-3 pt-4">order summary</h2>
                        <div className="info ps-3 pe-3">
                            <div className="flex justify-between">
                                <p className="text-gray-400">SubTotal</p>
                                <p className="font-bold">{useCart?.data.totalCartPrice} EGP</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Shipping</p>
                                <p className="text-green-500">FREE</p>
                            </div>
                        </div>
                        <div className="border-b-2 border-gray-700 pt-3"></div>
                        <div className="flex justify-between pt-3 ps-3">
                            <p className="text-gray-400">Total</p>
                            <p className="font-bold">{useCart?.data.totalCartPrice} EGP</p>
                        </div>
                         <Dialog>
                        <form>
                     <DialogTrigger asChild>
                <Button className="w-full mt-3">Proceed to checkout</Button>
                            </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Your shipping Information</DialogTitle>
            <DialogDescription>
              Please your shipping Information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Details</Label>
              <Input id="name-1" ref={detailsInput}  placeholder='' />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">City</Label>
              <Input id="username-1" ref={cityInput} placeholder="maadi-giza-alex" />
            </div>
             <div className="grid gap-3">
              <Label htmlFor="username-1">Phone</Label>
              <Input id="username-1" ref={phoneInput} placeholder="+201234567899" />
            </div>
          </div>
          <DialogFooter className='mx-auto'>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>     
             <Button type="submit"> <i className="fa-solid fa-money-bill"></i>Cash</Button>
             <Button onClick={()=>checkoutOut(useCart?.cartId.trim()!)} type="submit"> <i className="fa-brands fa-cc-visa"></i>Visa</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
                        <Link href={'/products'}>
                            <Button className="w-full mt-3 bg-white text-black border hover:bg-gray-400">Continue Shopping</Button>
                        </Link>
                        <AlertDialog>
                             <AlertDialogTrigger className='text-white text-sm flex items-center gap-1 font-medium justify-center mt-3 w-full bg-red-700 capitalize hover:bg-red-900 rounded-md py-1'>
                             {deletedAll ? <Loader2 className='animate-spin'></Loader2> : <Trash2></Trash2>}Clear All Cart</AlertDialogTrigger>
                                 <AlertDialogContent>
                                <AlertDialogHeader>
                                 <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                 <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction disabled={deletedAll} onClick={() => ClearAllCart()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                            

{/* <Button  onClick={() => ClearAllCart()} className='mt-3 w-full bg-red-700 capitalize hover:bg-red-900'>
                            {deletedAll ? <Loader2 className='animate-spin'></Loader2> : <Trash2></Trash2>}Clear All Cart</Button> */}
                    </div>
                </div>
                
            </div>
        </div >
    </>

}



// "use client"
// import Image from 'next/image'
// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "@/components/context/cartContext";
// import { Loader2, Minus, Plus, Trash, Trash2 } from "lucide-react";
// import Loading from "@/app/loading";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function Cart() {
//     const [isDeleted, setIsDeleted] = useState<boolean>(false);
//     let { useCart, setUseCart, isLoading, getCartData } = useContext(CartContext);
//     // const [deleteAll, setDeleteAll] = useState<{}>();



//     async function deleteItem(prodId: string) {
//         setIsDeleted(true);
//         const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
//             {
//                 method: "DELETE",
//                 headers: {
//                     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmYyY2Y5ZTJkY2M3MTVlNGRmOTc0ZiIsIm5hbWUiOiJvbWFyIGtlbmF3eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3MzU5MzUzLCJleHAiOjE3NjUxMzUzNTN9.tTEuouh2ww88PdCuer_nM2Oib5MIBNF_17BNr0ElNAI"
//                 }
//             });
//         const data = await response.json();
//         setUseCart(data);
//         setIsDeleted(false);
//     }
    
//     useEffect(() => {
//         getCartData();
//     }, []);

//     // async function ClearAllCart() {
//     //     setIsDeleted(true);
//     //     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,
//     //         {
//     //             method: "DELETE",
//     //             headers: {
//     //                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmYyY2Y5ZTJkY2M3MTVlNGRmOTc0ZiIsIm5hbWUiOiJvbWFyIGtlbmF3eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3MzU5MzUzLCJleHAiOjE3NjUxMzUzNTN9.tTEuouh2ww88PdCuer_nM2Oib5MIBNF_17BNr0ElNAI"
//     //             }
//     //         });
//     //     const data = await response.json(); setIsDeleted(false);
//     // }

//     return <>
//         <h1 className="font-bolder text-3xl m-3 uppercase font-medium ">Shopping Cart</h1>
//         <div className="prod p-9">
//             <div className=" flex mb-3">
//                 {isLoading || typeof useCart?.data.products[0].product == "string" ? <Loading></Loading> :
//                     <div className="max-w-7/12 p-4">
//                         {useCart?.data.products.map((prod) =>
//                             <div key={prod.product._id} className="border-b-2">
//                                 <div className="main flex items-center">
//                                     <Image className="p-3 rounded-2xl" src={prod.product.imageCover} alt={prod.product.title} width={200} height={200}></Image>
//                                     <div className="text">
//                                         <p>{prod.product.title}</p>
//                                         <div className="more flex">
//                                             <p className="pe-3 text-gray-400">{prod.product.brand.name}</p>
//                                             <span> - </span>
//                                             <p className="ps-3 text-gray-400">{prod.product.category.name}</p>
//                                         </div>
//                                         <div className="flex">
//                                             <div className="counter flex items-center space-x-4 pt-5">
//                                                 <Button className="bg-transparent border hover:bg-gray-200 cursor-pointer"><Minus className="text-black"></Minus></Button>
//                                                 <p>0</p>
//                                                 <Button className="bg-transparent border hover:bg-gray-200 me-2 cursor-pointer"><Plus className="text-black"></Plus></Button>
//                                             </div>
//                                             <div onClick={() => deleteItem(prod.product._id)} className="remove ms-33 text-red-700 cursor-pointer pt-5 flex gap-2">
//                                                 <Button className="bg-red-700 hover:bg-red-900">{isDeleted ? <Loader2 className="animate-spin"></Loader2> : <Trash2></Trash2>} Delete Item</Button>
//                                             </div>
//                                         </div>
//                                         <p className='pt-3 font-bold'>Price :<span className='font-light text-gray-500 ps-3'>{prod.price} EGP</span></p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 }
//                 <div className="w-5/12 mx-auto mt-20">
//                     <div className="border p-2 rounded-2xl">
//                         <h2 className="capitalize ps-3 pt-4">order summary</h2>
//                         <div className="info ps-3 pe-3">
//                             <div className="flex justify-between">
//                                 <p className="text-gray-400">SubTotal</p>
//                                 <p className="font-bold">{useCart?.data.totalCartPrice} EGP</p>
//                             </div>
//                             <div className="flex justify-between">
//                                 <p className="text-gray-400">Shipping</p>
//                                 <p className="text-green-500">FREE</p>
//                             </div>
//                         </div>
//                         <div className="border-b-2 border-gray-700 pt-3"></div>
//                         <div className="flex justify-between pt-3 ps-3">
//                             <p className="text-gray-400">Total</p>
//                             <p className="font-bold">{useCart?.data.totalCartPrice} EGP</p>
//                         </div>
//                         <Button className="w-full mt-3">Proceed to checkout</Button>
//                         <Link href={'/products'}>
//                             <Button className="w-full mt-3 bg-white text-black border hover:bg-gray-400">Continue Shopping</Button>
//                         </Link>
//                         <Button className='mt-3 w-full bg-red-700 capitalize hover:bg-red-900'>
//                             {isDeleted ? <Loader2 className='animate-spin'></Loader2> : <Trash2></Trash2>}Clear All Cart</Button>
//                     </div>
//                 </div>
//             </div>
//         </div >
//     </>


// }
 