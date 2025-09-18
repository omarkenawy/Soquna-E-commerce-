"use server"

import { getUserToken } from "@/helpers/getUserToken/GetUserToken";

export async function addToWishListActions(productId: string) {
    let mainToken = await getUserToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            method: "POST",
            headers: {
                token: mainToken + '',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId: productId })
        }
    );
    const data = await response.json();
    return data;
}