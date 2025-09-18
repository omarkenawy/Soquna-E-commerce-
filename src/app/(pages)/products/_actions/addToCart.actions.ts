"use server"

import { getUserToken } from "@/helpers/getUserToken/GetUserToken";


export async function addToCartAction(productId: string) {


    let mainToken = await getUserToken();

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            method: "POST",
            headers: {
                token: mainToken + "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId: productId })
        }
    )
    const data = await response.json();
    return data;
}