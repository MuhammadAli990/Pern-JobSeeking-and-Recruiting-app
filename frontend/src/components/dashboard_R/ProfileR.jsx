import React, { useEffect, useState } from 'react'
import About from './About';
import JobsPosted from './JobsPosted';

function ProfileR() {
  const [detailsTab, setDetailsTab] = useState('jobsPosted');
  const [userDetails,setUserDetails] = useState(null);

  const handleTabClick = (p)=>{
    setDetailsTab(p);
  }

  const getUserDetails = async()=>{
    const res = await fetch('http://127.0.0.1:3000/getUserData',{
      method:"GET",
      credentials:"include"
    })
    const result = await res.json();
    if(result.success){
      setUserDetails(result.data);
    }
  }
  useEffect(()=>{
    getUserDetails();
  },[])

  return (
    <div className='md:w-[64%] flex flex-col gap-4'>

      <div className='flex sm:flex-row flex-col justify-center items-center gap-6'>
        <div className='flex-shrink-0'>
          <img className='w-36 h-36 rounded-full' src="/profile.png"/>
        </div>

        <div className='flex flex-col sm:text-left text-center'>
          <h1 className='font-extrabold text-4xl'>{userDetails?.username}</h1>
          <h4 className='text-xl font-semibold'>{userDetails?.industry}</h4>
          <p className='text-sm'>{userDetails?.bio}</p>
        </div>
      </div>

      <div className='flex sm:flex-row flex-col shadow-sm border justify-evenly py-2 rounded-full'>
        <div className='flex justify-center'>
          <h3 className='font-semibold'>Headquarters:&nbsp;</h3>
          <p>{userDetails?.headquarters}</p>
        </div>

        <div className='flex justify-center'>
          <h3 className='font-semibold'>Email:&nbsp;</h3>
          <p>{userDetails?.email}</p>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='shadow-sm border px-8 text-lg font-semibold py-2 flex justify-around'>
          <h4 onClick={()=>handleTabClick("jobsPosted")} className={`${detailsTab==="jobsPosted"?'text-blue-500':'text-black'} hover:text-blue-500 cursor-pointer duration-200`}>Jobs Posted</h4>
          <h4 onClick={()=>handleTabClick("About")} className={`${detailsTab==="About"?'text-blue-500':'text-black'} hover:text-blue-500 cursor-pointer duration-200`}>About</h4>
        </div>

        {detailsTab==='About' && <About data={userDetails?.about}/>}
        {detailsTab==='jobsPosted' && <JobsPosted recruiterId={userDetails?.id}/>}
      </div>
    </div>
  )
}

export default ProfileR
