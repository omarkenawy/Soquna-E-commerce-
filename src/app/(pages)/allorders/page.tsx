"use client"
import { CartContext } from '@/components/context/cartContext'
import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { orderI } from '@/interfaces/orders';
import Loading from '@/app/loading';

export default function AllOrders() {
    const [isLoading, setisLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<orderI[]>([]);

    async function getUserOrder() {
        setisLoading(true)
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("userId")}`,
            {
                method: "GET",
            }
        )
        const { data: orders }: { data: orderI[] } = await response.json();
        setOrders(orders);
        setisLoading(false);
        console.log(orders);

    }

    useEffect(() => {
        getUserOrder();
    }, [])


    return <>
        {isLoading ? <Loading></Loading> :
            <div className="allOrders">
                {orders?.map((order) =>
                    <div key={order._id} className="div">
                        <Card>
                            <CardHeader>
                                {/* <CardTitle>{order.paymentMethodType}</CardTitle> */}
                                <CardDescription>Card Description</CardDescription>
                                <CardAction>Card Action</CardAction>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </div>
        }

    </>
}
