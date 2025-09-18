import React from 'react'

export default function NoProducts() {
    return <>

        <div className='mx-auto p-3'>
            <h1 className='font-extrabold text-7xl flex justify-center'>Sorry <span className='text-blue-500 ms-3'> !!</span></h1>
            <p className='flex justify-center text-5xl mt-5 '><span className='me-5 text-blue-500'>No products </span>found at this time</p>
            <p className='flex justify-center text-5xl mt-5'>We are looking into this and we will fix it soon</p>
            <div className="div flex justify-center">
                <i className="fa-solid fa-hourglass-half fa-spin text-5xl mt-20"></i>
            </div>
        </div>


    </>
}
