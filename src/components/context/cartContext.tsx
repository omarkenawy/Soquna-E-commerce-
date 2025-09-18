'use client'
import { CartResponse } from '@/interfaces/cart';
import { useSession } from 'next-auth/react';
import React, { createContext, ReactNode, useEffect, useState } from 'react'


export const CartContext = createContext<{
  useCart: CartResponse | null,
  setUseCart: (value: CartResponse | null) => void,
  isLoading: Boolean,
  setIsLoading: (value: Boolean) => void,
  getCartData: () => void,
}>({
  useCart: null,
  setUseCart: () => { },
  isLoading: false,
  setIsLoading: () => { },
  getCartData: () => { },
})

export default function CartContextProvider({ children }: { children: ReactNode }) {

  const [useCart, setUseCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);



  const mainSession = useSession();
  async function getCartData() {


    setIsLoading(true)
    const response = await fetch("http://localhost:3000/api/get-cart",
      { headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmYyY2Y5ZTJkY2M3MTVlNGRmOTc0ZiIsIm5hbWUiOiJvbWFyIGtlbmF3eSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU3MzU5MzUzLCJleHAiOjE3NjUxMzUzNTN9.tTEuouh2ww88PdCuer_nM2Oib5MIBNF_17BNr0ElNAI" } }
    );
    const data = await response.json();
    setUseCart(data);
    if (useCart?.data.cartOwner) {
      localStorage.setItem("userId", useCart?.data.cartOwner)
    }
    setIsLoading(false);
  }

  useEffect(() => {

    getCartData();


  }, [mainSession.status])


  return <CartContext.Provider value={{ useCart, setUseCart, isLoading, setIsLoading, getCartData, }}>
    {children}
  </CartContext.Provider>
}
