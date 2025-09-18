"use client"
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
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";



export default function CardProductDetails() {
    const [products, setproducts] = useState<ProductI[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    async function getAllProducts() {
        setIsLoading(true);
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
        const { data: products }: { data: ProductI[] } = await response.json();
        setproducts(products);
        setIsLoading(false);
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return <>
        <div className='flex flex-wrap'>

            {isLoading ? <PulseLoader className="mx-auto  mt-50 w-20 h-20 animate-pulse"></PulseLoader> : products.map((product) => <div key={product._id} className=' w-1/4 p-3'>
                <Card className=''>
                    <Image width={100} className='w-full' height={100} src={product.imageCover} alt=''></Image>
                    <CardHeader>
                        <CardDescription>{product.brand.name}</CardDescription>
                        <CardTitle className='truncate'>{product.title}</CardTitle>
                    </CardHeader>
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
                    <div className="btn flex justify-between p-2">
                        <Button> <ShoppingCart> </ShoppingCart>Add to Cart</Button>
                        <Heart></Heart>
                    </div>
                </Card>

            </div>
            )
            }

        </div>

    </>
}


