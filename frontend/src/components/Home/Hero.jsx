import React from 'react'
import '../../App.css'

function Hero() {
  return (
    <div className='z-10'>
        <div className='md:h-[620px] h-screen relative flex justify-center items-center'>
            <div className='absolute z-20 md:p-0 p-4'>
                <h1 className='text-white text-center md:text-[140px] text-[80px] font-extrabold'>Joblify</h1>
                <h3 className='text-white text-center text-2xl font-semibold mb-20'>Where Talent and Opportunity Meet - Connecting People and Creating Success</h3>
            </div>
            <video className='w-full h-full object-cover darken' autoPlay loop disablePictureInPicture muted>
                <source src='/heroBg.mp4'/>
            </video>
        </div>
    </div>
  )
}

export default Hero
