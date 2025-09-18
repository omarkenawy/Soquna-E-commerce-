import { Loader2 } from 'lucide-react'
import React from 'react'
import { PulseLoader } from 'react-spinners'

export default function Loading() {
    return <>
        <div className='flex justify-center items-center py-40'>
            <PulseLoader className="mx-auto mt-50 w-20 h-20 animate-pulse " color='#3B82F6'></PulseLoader>
        </div>
    </>
}
