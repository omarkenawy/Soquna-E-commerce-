"use server"
import { getUserToken } from "@/helpers/getUserToken/GetUserToken";
import { CartResponse } from "@/interfaces/cart";


export async function deleteItemCarActions(prodId: string) {
    let mainToken = getUserToken()
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,
        {
            method: "DELETE",
            headers: {
                token: mainToken + ''
            }
        });
    const data: CartResponse = await response.json();
    return data;
}