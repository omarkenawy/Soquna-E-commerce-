
"use client"

import { Heart, Loader2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import WishListContextProvider, { WishListContext } from '../context/wishListContext';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { addToWishListActions } from '@/app/(pages)/wishList/_actions/addToWishList.actions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



export default function AddToWhishList({ productId }: { productId: string }) {
    let { getWishListData, setisListed } = useContext(WishListContext)
    const [isLoading, setIsLoading] = useState(false);
    let mainSession = useSession();
    let router = useRouter();

    async function addToWishList() {
        if (mainSession.status == 'authenticated') {
            setIsLoading(true);
            const data = await addToWishListActions(productId)
            await getWishListData();
            toast("Your product is added sucessfully to whishlist ✅");
            setIsLoading(false);
        } else {
            router.push('/login');
        }
    }
    return <>
        <Button disabled={isLoading} onClick={() => addToWishList()}>{isLoading ? <Loader2 className='animate-spin'></Loader2> : <Heart ></Heart>}</Button>
    </>
}
