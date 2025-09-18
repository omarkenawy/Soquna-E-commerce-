"use client"
import React from 'react'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from "react";
import Loading from "@/app/loading";
import { WishListContext } from '@/components/context/wishListContext';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { WishListI } from '@/interfaces/wishList';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { getUserToken } from '@/helpers/getUserToken/GetUserToken';
import { deleteWishListItemActions } from './_actions/deleteWishListItem.actions';


export default function WishList() {

    const [isDeleted, setisDeleted] = useState<string | null>(null);
    let { getWishListData, isListed, wishList, setWishList } = useContext(WishListContext);
    let mainSession = useSession();





    async function deleteWishListData(prodId: string) {
        setisDeleted(prodId);
        const data: WishListI = await deleteWishListItemActions(prodId);
        if (data.status == "success") {
            toast("Your product is removed");
            setWishList(data);
        }
        setisDeleted(null);
    }
    useEffect(() => {
        getWishListData();
    }, [mainSession.status]);


    return <>
        {isListed || wishList?.data.length == null ? <Loading></Loading> :
            <div className="p-4">
                {wishList?.data.map((wish) =>
                    <div key={wish._id} className="border-b-2">
                        <div className="main flex items-center">
                            <Image className="p-3 rounded-2xl" src={wish.imageCover} alt={wish.title} width={200} height={200}></Image>
                            <div className="text">
                                <p>{wish.title}</p>
                                <div className="more flex">
                                    <p className="pe-3 text-gray-400">{wish.brand.name}</p>
                                    <span> - </span>
                                    <p className="ps-3 text-gray-400">{wish.category.name}</p>
                                </div>
                                <p className='pt-3 font-bold'>Price :<span className='font-light text-gray-500 ps-3'>{wish.price} EGP</span></p>
                                <Button disabled={isDeleted == wish._id} onClick={() => deleteWishListData(wish._id)} className='mt-5 bg-red-700 hover:bg-red-900'>
                                    {isDeleted == wish._id ? <Loader2 className='animate-spin'></Loader2> : <Trash2></Trash2>}Remove Item
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        }
    </>
}
