import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"

function GetaJobSteps() {
  return (
    <ScrollAnimation animateIn='fadeIn' duration={1} className='max-w-[1200px] px-4 mx-auto mt-12 flex flex-col gap-4'>
      <h1 className='text-5xl font-extrabold'>Find a job</h1>

      <div className='border shadow-md px-4 py-4'>
        <h3 className='font-bold text-xl'>1. Make an account <span className='text-2xl'>✨</span></h3>
        <p>Just simple as entering a username, email & password.</p>
      </div>

      <div className='border shadow-md px-4 py-4'>
        <h3 className='font-bold text-xl'>2. Setup your account <span className='text-2xl'>🔥</span></h3>
        <p>Upload your skills, experience, education and a profile photo.</p>
      </div>

      <div className='border shadow-md px-4 py-4'>
        <h3 className='font-bold text-xl'>3. Apply from thousands of available jobs <span className='text-2xl'>🚀</span></h3>
        <p>Just click on apply and send an application.</p>
      </div>

      <div className='border shadow-md px-4 py-4'>
        <h3 className='font-bold text-xl'>4. Get selected by recruiters <span className='text-2xl'>🎉</span></h3>
        <p>Receive real time notification from recruiter and other important details.</p>
      </div>
    </ScrollAnimation>
  )
}

export default GetaJobSteps
