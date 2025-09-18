import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loading from '@/app/loading';
import NoProducts from '@/app/no-products';
import AddToCart from '@/components/addToCart/addToCart';

export default async function CategoriesDetails({ params }: { params: Params }) {

    let { categoryId } = await params;

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
    const { data: products }: { data: ProductI[] } = await response.json();
    // const data = await response.json();
    // console.log(data);


    return <>
        {products.length ? <div className='flex flex-wrap'>
            {products.map((product) => <div key={product._id} className=' w-1/4 p-3'>
                <Card className=''>
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
                            <StarIcon className='text-yellow-300'></StarIcon>
                            <StarIcon className='text-yellow-300'></StarIcon>
                            <StarIcon className='text-yellow-300'></StarIcon>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className='font-bold'>Price : <span className='font-medium'>{product.price} USD</span></p>
                    </CardFooter>

                    <AddToCart productId={product._id}></AddToCart>
                </Card >
            </div >)
            }
        </div > : <NoProducts></NoProducts>}


    </>
}
