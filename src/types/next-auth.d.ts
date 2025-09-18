import { UserResponse } from './../interfaces/login';

import NextAuth, { User } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: UserResponse
    }

    interface User {
        user: UserResponse
        token: string
    }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends User{}
}