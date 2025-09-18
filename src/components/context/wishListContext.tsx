"use client"
import { WishListI } from '@/interfaces/wishList';
import React, { createContext, ReactNode, useEffect, useState } from 'react'




export const WishListContext = createContext<{
    isListed: Boolean,
    setisListed: (value: Boolean) => void,
    wishList: WishListI | null,
    setWishList: (value: WishListI | null) => void,
    getWishListData: () => void
}>({
    isListed: true,
    setisListed: () => { },
    wishList: null,
    setWishList: () => { },
    getWishListData: () => { }
});

export default function WishListContextProvider({ children }: { children: ReactNode }) {
    const [isListed, setisListed] = useState<Boolean>(true);
    const [wishList, setWishList] = useState<WishListI | null>(null);

    async function getWishListData() {
        setisListed(true)
        const response = await fetch(`http://localhost:3000/api/get-wishlist`,
            { headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmYyY2Y5ZTJkY2M3MTVlNGRmOTc0ZiIsIm5hbWUiOiJvbWFyIGtlbmF3eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3MzU5MzUzLCJleHAiOjE3NjUxMzUzNTN9.tTEuouh2ww88PdCuer_nM2Oib5MIBNF_17BNr0ElNAI" } }
        );
        const data = await response.json();
        setWishList(data)
        setisListed(false);
    }

    useEffect(() => {
        getWishListData();
    }, []);



    return <WishListContext.Provider value={{ wishList, setWishList, isListed, setisListed, getWishListData }}>
        {children}
    </WishListContext.Provider>
}
