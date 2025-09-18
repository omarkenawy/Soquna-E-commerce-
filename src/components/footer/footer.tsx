import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return <>
        <div className="div bg-black text-white p-3 mt-9 static end-0 bottom-0">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="badge">
                        <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    </div>
                    <Link className='text-3xl font-bold ' href={'/'}>SOQUNA</Link>
                </div>
                <div className="Contact">
                    <p className='text-xl text-white'>Contacts</p>
                    <p className='text-gray-500'>+201141681006</p>
                    <Link className='text-gray-500' href={''}>Soquna@gmail.com</Link>
                </div>
                <div className="Shop">
                    <p className='text-xl text-white'>Shop</p>
                    <p><Link href="/products" className='text-gray-500'>Products</Link></p>
                    <p><Link href="/categories" className='text-gray-500'>Categories</Link></p>
                    <p><Link href="/brands" className='text-gray-500'>Brands</Link></p>
                </div>
                <div className="Company">
                    <p className='text-xl text-white'>Company</p>
                    <p className='text-gray-500'>Cookies</p>
                    <p className='text-gray-500'>Payments </p>
                    <p className='text-gray-500'>Terms & Conditions </p>
                    <p className='text-gray-500'>Privacy and Policy </p>
                    <p className='text-gray-500'>Security</p>
                </div>
            </div>
            <p className="text-xl -mt-6 text-blue-700">Your Online Shopping Destination</p>
        </div>
    </>
}
