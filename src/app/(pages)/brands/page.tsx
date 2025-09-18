import Link from 'next/link';
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

export default async function Brands() {


    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", { method: "GET" });
    const { data: brands }: { data: BrandI[] } = await response.json();
    console.log(brands);



    return <>
        <h1 className="font-bolder text-3xl m-3">Shop by Category</h1>
        <div className="flex flex-wrap mx-auto">
            {brands.map((brand) =>
                <div className="div p-5 cursor-pointer" key={brand._id}>
                    <Link href={'/categories/' + brand._id}>
                        <Card className='hover:scale-120 hover:duration-500 '>
                            <CardContent>
                                <Image alt="image" src={brand.image} width={200} height={200} ></Image>
                            </CardContent>
                            <p className="text-center border-t-2 pt-4 border-t-gray-400 text-xl">{brand.name}</p>
                        </Card>
                    </Link>
                </div>
            )}
        </div>



    </>
}
