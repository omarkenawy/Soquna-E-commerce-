import { getUserToken } from "@/helpers/getUserToken/GetUserToken";
import { NextResponse } from "next/server";


export async function GET() {
    let mainToken = await getUserToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers: { token: mainToken + " " } }
    );
    const data = await response.json();
    return NextResponse.json(data);
}