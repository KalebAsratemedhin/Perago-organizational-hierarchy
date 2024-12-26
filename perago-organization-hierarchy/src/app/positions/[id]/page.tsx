'use client'
import { useGetPositionQuery } from '@/redux/api/position'
import React from 'react'
import Image from 'next/image'

const page = ({params}: {params: {id: number}}) => {
    const {isLoading, isSuccess, isError, error, data} = useGetPositionQuery(params.id)
  return (
    <div className='border rounded-md px-5  py-5 border-gray-400 flex gap-4 w-2/3 mx-auto'>
            <Image src={'/profile-1.jpg'} className='rounded-full' width={200} height={200} alt={'profile'} />

        <div className='pt-9'>
            {data && <p className='text-2xl font-bold'>{data.name}</p>}
            {data && <p className='text-lg my-4'>{data.description}</p>}

            

        </div>


    </div>
  )
}

export default page