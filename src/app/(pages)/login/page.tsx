import React from 'react'
import { LoginForm } from './_componnt/loginForm/LoginForm'


export default function Login() {
    return <>
        <div className="min-h-[60vh] flex flex-col justify-center items-center gap-3">
            <h1 className='text-3xl font-bold'>Welcome Back !</h1>
            <LoginForm></LoginForm>
        </div>
    </>
}
