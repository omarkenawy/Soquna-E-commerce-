import { User } from './../../../../../interfaces/orders';
import CredentialsProvider from "next-auth/providers/credentials"

import NextAuth from "next-auth"


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Creditional",
            credentials: {
                email: { type: "text", placeholder: "UserName" },
                password: { type: "pasword", placeholder: "Password@1234" }
            },
            authorize: async (credentials) => {
                const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        }),
                        method: "POST"
                    }
                );
                const payload = await response.json();

                if (response.ok) {
                    return {
                        id: payload.user.email,
                        user: payload.user,
                        token: payload.token
                    }
                } else {
                    throw new Error(payload.message)
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.user = user.user;
                token.token = user.token;
            }
            return token
        },
        session: ({ session, token }) => {
            session.user = token.user;
            return session
        }
    },
    pages: {
        signIn: '/login ',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET 
})

export { handler as GET, handler as POST }