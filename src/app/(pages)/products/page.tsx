import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Heart, ShoppingCart, StarIcon } from 'lucide-react';
import Link from 'next/link';
import AddToCart from '@/components/addToCart/addToCart';
import AddToWhishList from '@/components/addToWishList/addToWishList';



export default async function Products() {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
    const { data: products }: { data: ProductI[] } = await response.json();

    console.log(products[0]);



    return <>
        <div className='flex flex-wrap'>
            {products.map((product) => <div key={product._id} className=' w-3/12 sm:w-10/12 sm:mx-auto lg:w-2/12 p-3'>
                <Card className="hover:scale-102 hover:duration-500 ">
                    <Link href={`/products/${product._id}`}>
                        <Image width={100} className='w-full' height={100} src={product.imageCover} alt=''></Image>
                        <CardHeader>
                            <CardDescription>{product.brand.name}</CardDescription>
                            <CardTitle className='truncate'>{product.title}</CardTitle>
                        </CardHeader>
                    </Link>
                    <CardContent>
                        <CardDescription>{product.category.name}</CardDescription>
                        <div className="rate flex justify-start ">
                            <p className='pe-3'>{product.ratingsAverage}</p>
                            <StarIcon className='text-yellow-300 fill-yellow-400' ></StarIcon>
                            <StarIcon className='text-yellow-300 fill-yellow-400'></StarIcon>
                            <StarIcon className='text-yellow-300 fill-yellow-400'></StarIcon>
                            <StarIcon className='text-yellow-300 fill-yellow-400'></StarIcon>

                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className='font-bold'>Price : <span className='font-medium'>{product.price} EGP</span></p>
                    </CardFooter>

                    <div className="flex items-center px-3">
                        <AddToCart productId={product._id}></AddToCart>
                        <AddToWhishList productId={product._id}></AddToWhishList>
                    </div>
                </Card>
            </div>)}
        </div>

    </>
}
