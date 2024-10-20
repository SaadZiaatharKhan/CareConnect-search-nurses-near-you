import React from 'react'
import Image from 'next/image'

const Topbar = () => {
  return (
    <div className='w-full h-32 flex justify-center items-center'>
      <Image src={"/assets/images/image.jpg"} height={50} width={100} alt='image'></Image>
      <div className='m-1 p-1 flex justify-center items-center'>
      <h1 className='font-bold p-8 flex justify-center items-center text-2xl sm:text-4xl'>HEALTHVISION AI</h1>
    </div>
    </div>
  )
}

export default Topbar