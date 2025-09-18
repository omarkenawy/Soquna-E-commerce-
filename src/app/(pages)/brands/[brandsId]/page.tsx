import NoProducts from '@/app/no-products';
import AddToCart from '@/components/addToCart/addToCart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
import { Params } from 'next/dist/server/request/params';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function BrandsDetails({ params }: { params: Params }) {

    let { brandId } = await params;

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
    const { data: products }: { data: ProductI[] } = await response.json();

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
