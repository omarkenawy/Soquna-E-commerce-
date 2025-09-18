import React from 'react'

export default function Notfound() {
    return <>
        <div className="notFound pt-28">
            <p className='flex justify-center'>This page that you are looking for can't be found</p>
            <div className='flex justify-center items-center'>
                <h1 className='text-7xl text-red-600'>
                    4<span><i className="fa-solid fa-ban" /></span>4
                </h1>
            </div>
        </div>
    </>
}
