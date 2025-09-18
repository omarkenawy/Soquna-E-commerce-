"use server"

import { getUserToken } from "@/helpers/getUserToken/GetUserToken";
import { WishListI } from "@/interfaces/wishList";



export async function deleteWishListItemActions(prodId: string) {
    let mainToken = getUserToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`, {
        method: "DELETE",
        headers: {
            token: mainToken + ''
        }
    });
    const data: WishListI = await response.json();
    return data
}