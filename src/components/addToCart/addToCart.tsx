"use client"
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { Heart, Loader2, ShoppingCart } from 'lucide-react'
import { toast, Toaster } from "sonner"
import { CartContext } from '../context/cartContext'
import { addToCartAction } from '@/app/(pages)/products/_actions/addToCart.actions'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function AddToCart({ productId }: { productId: string }) {

    const [isLoading, setIsLoading] = useState(false);
    let { getCartData, setUseCart } = useContext(CartContext);
    let mainSession = useSession();
    let router = useRouter();

    async function addProduct() {
        if (mainSession.status == "authenticated") {
            setIsLoading(true);
            const data = await addToCartAction(productId)
            // await getCartData();
            setUseCart(data);
            console.log(data);
            toast(<p className="text-gray-500 text-lg">Product is added successfully ✅</p>)
            setIsLoading(false);
        } else {
            router.push('/login');
        }
    }

    return <>
        <div className="btn flex gap-3 items-center p-2 cursor-pointer sm:mx-auto ">
            <Button disabled={isLoading} onClick={() => addProduct()} className='lg:w-40 md:w-1xs sm:w-20'> {isLoading ? <Loader2 className='animate-spin'></Loader2> : <ShoppingCart></ShoppingCart>}Add to Cart</Button>

        </div>
    </>

}


