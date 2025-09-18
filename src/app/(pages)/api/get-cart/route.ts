import { getUserToken } from "@/helpers/getUserToken/GetUserToken";
import { CartResponse } from "@/interfaces/cart";
import { NextResponse } from "next/server";


export async function GET() {

    let mainToken = await getUserToken();
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart",
        { headers: { token: mainToken + '' } }
    );
    const data: CartResponse = await response.json();
    return NextResponse.json(data);
}