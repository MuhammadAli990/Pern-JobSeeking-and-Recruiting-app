import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { showSuccessToast } from '../toasts/SuccessToast';
import { showErrorMessage } from '../toasts/ErrorToast';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:3000/logIn',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email,password}),
      credentials:"include"
    })
    const result = await res.json();
    if(result.success){
      showSuccessToast("Logged-in successfully.");
      navigate('/');
    }
    else{
      showErrorMessage(result.message);
    }
  }

  return (
    <div className='min-h-screen w-full flex justify-center'>
      <div className='md:w-[60%] md:block hidden'>
        <video muted autoPlay loop disablePictureInPicture className='object-cover w-full h-full'>
          <source src='/loginBg.mp4'/>
        </video>
      </div>

      <form onSubmit={handleSubmit} className='md:w-[40%] p-10 flex gap-6 flex-col justify-center items-center relative'>
        <h1 className='font-bold text-7xl '>Log-in</h1>
        <div className='flex flex-col gap-2'>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder='Enter your email..' type="email" className='w-80 h-10 outline-none px-2 rounded-md border-2 border-black'/>
          <input value={password} onChange={(e)=>setPassword(e.target.value.trim())} required placeholder='Enter your password..' type="password" className='w-80 h-10 outline-none px-2 rounded-md border-2 border-black'/>
          <button className='bg-blue-500 max-w-fit mx-auto px-8 py-2 rounded-md font-semibold shadow-lg text-white hover:bg-blue-600 duration-200 active:scale-95 mt-2'>Log-in</button>
        </div>
        <div className='absolute bottom-2'>
          <p>Don't have an account? <Link to={'/signup'} className='text-blue-600 underline'>Sign-up</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login
