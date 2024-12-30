import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { showSuccessToast } from '../toasts/SuccessToast';
import { showErrorMessage } from '../toasts/ErrorToast';

function Signup() {
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:3000/signUp',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({username,email,password,role})
    })
    const result = await res.json();
    if(result.success){
      showSuccessToast("Account created ❗ You can now login.");
      navigate('/login');
    }
    else{
      showErrorMessage(result.message);
    }
  }

  return (
    <div className='min-h-screen w-full flex justify-center'>
      <div className='w-[60%] md:block hidden'>
        <video muted autoPlay loop disablePictureInPicture className='object-cover w-full h-full'>
          <source src='/loginBg.mp4'/>
        </video>
      </div>

      <div className='md:w-[40%] p-10 flex gap-6 flex-col justify-center items-center relative'>
        <h1 className='font-bold text-7xl'>Sign-up</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
          <input required minLength={3} maxLength={50} pattern="^[A-Za-z]+( [A-Za-z]+)*$" title='No number or extra space' placeholder='Write your realname/company name..' type="text" className='w-80 h-10 outline-none px-2 rounded-md border-2 border-black' value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <input required placeholder='Enter your email..' type="email" className='w-80 h-10 outline-none px-2 rounded-md border-2 border-black' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input required minLength={6} pattern='^[^\s]+$' title='No extra space' placeholder='Choose your password..' type="password" className='w-80 h-10 outline-none px-2 rounded-md border-2 border-black' value={password} onChange={(e)=>setPassword(e.target.value.trim())}/>
          <div className='flex gap-2 justify-center items-center mt-2'>
            <h4 className='font-semibold'>Continue as: </h4>
            <div className='flex gap-1 items-center'>
              <input required className='h-4 w-4' type="radio" name='role' id="jobSeeker" onChange={()=>setRole('jobSeeker')}/>
              <label htmlFor="jobSeeker">Job Seeker</label>
            </div>
            <div className='flex gap-1 items-center'>
              <input required className='h-4 w-4' type="radio" name='role' id="recruiter" onChange={()=>setRole('recruiter')}/>
              <label htmlFor="recruiter">Recruiter</label>
            </div>
          </div>
          <button type='submit' className='bg-blue-500 max-w-fit mx-auto px-8 py-2 rounded-md font-semibold shadow-lg text-white hover:bg-blue-600 duration-200 active:scale-95 mt-2'>Sign-up</button>
        </form>

        <div className='absolute bottom-2'>
          <p>Already have an account? <Link to={'/login'} className='text-blue-600 underline'>Sign-in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
