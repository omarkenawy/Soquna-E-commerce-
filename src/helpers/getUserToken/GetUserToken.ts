import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getUserToken() {

    const x = (await cookies()).get("next-auth.session-token")?.value;
    const mainToken = await decode({ secret: process.env.NEXTAUTH_SECRET!, token: x });
    return mainToken?.token;
} 