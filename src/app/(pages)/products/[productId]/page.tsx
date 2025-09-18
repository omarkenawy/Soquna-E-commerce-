import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddToCart from '@/components/addToCart/addToCart';

export default async function ProductsDetails({ params }: { params: Params }) {

    let { productId } = await params;

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId);
    const { data: product }: { data: ProductI } = await response.json();

    return <>

        <div className="main my-13 border rounded-3xl p-10 shadow flex">
            <div className="image p-3 w-3/12">
                <Carousel>
                    <CarouselContent>
                        {product.images.map((img, index) => <CarouselItem key={index}><Image src={img} width={400} height={400} alt={product.description}></Image></CarouselItem>
                        )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="info pt-20 ps-20 w-6/12">
                <p className='font-extralight text-gray-500'>{product.brand.name}</p>
                <p className='font-medium'>{product.title}</p>
                <p className='font-light'>{product.description}</p>
                <p className='pt-14 font-extralight text-gray-500'>{product.category.name}</p>
                <div className="rating flex items-center gap-3">
                    <Star className='text-yellow-400 fill-yellow-400'></Star>
                    <p>{product.ratingsQuantity}</p>
                    <p>remaining : {product.ratingsQuantity} products</p>
                </div>
                <p>sold: ({product.quantity})</p>
                <p className='font-bold mt-5 text-2xl'>Price: <span className='font-medium'>{product.price} EGP</span></p>
                <AddToCart productId={product._id}></AddToCart>

            </div>


        </div>
    </>
}
