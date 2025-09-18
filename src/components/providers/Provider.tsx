"use client"
import React, { ReactNode } from 'react'
import Navbar from "@/components/Navbar/navbar";
import { Toaster } from "sonner";
import CartContextProvider from "@/components/context/cartContext";
import Footer from "@/components/footer/footer";
import WishListContextProvider from "@/components/context/wishListContext";
import { SessionProvider } from 'next-auth/react';

export default function Provider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <CartContextProvider>
                <WishListContextProvider>
                    <Navbar></Navbar>
                    <div className="container mx-auto">
                        <main>{children}</main>
                        <Toaster />
                    </div>
                    <Footer></Footer>
                </WishListContextProvider>
            </CartContextProvider>
        </SessionProvider>
    )
}
