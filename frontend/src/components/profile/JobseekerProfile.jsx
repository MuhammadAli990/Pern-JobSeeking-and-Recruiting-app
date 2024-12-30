import React, { useEffect, useState } from 'react'
import EducationDetails from '../dashboard/EducationDetails';
import SkillsDetails from '../dashboard/SkillsDetails';
import ExperienceDetails from '../dashboard/ExperienceDetails';
import { useParams } from 'react-router-dom';
import Navbar from '../Home/Navbar';

function JobseekerProfile() {
    const {slug} = useParams();
  const [detailsTab, setDetailsTab] = useState('Education');
  const [userDetails,setUserDetails] = useState(null);

  const handleTabClick = (p)=>{
    setDetailsTab(p);
  }

  const getUserDetails = async()=>{
    const res = await fetch(`http://127.0.0.1:3000/getProfileByJobseekerId?id=${slug}`,{
        method:"GET"
    });
    const result = await res.json();
    if(result.success){
      setUserDetails(result.data);
    }
  }
  useEffect(()=>{
    getUserDetails();
  },[slug])

  return (
    <>
    <Navbar color='black'/>
    <div className='max-w-[1000px] mx-auto px-4 flex flex-col gap-4 pt-20'>

      <div className='flex sm:flex-row flex-col justify-center items-center gap-6'>
        <div className='flex-shrink-0'>
          <img className='w-36 h-36 rounded-full' src="/profile.png"/>
        </div>

        <div className='flex flex-col sm:text-left text-center'>
          <h1 className='font-extrabold text-4xl'>{userDetails?.username}</h1>
          <h4 className='text-xl font-semibold'>{userDetails?.role}</h4>
          <p className='text-sm'>{userDetails?.bio}</p>
        </div>
      </div>

      <div className='flex shadow-sm border justify-evenly py-2 rounded-full'>
        <div className='flex'>
          <h3 className='font-semibold'>City/State:&nbsp;</h3>
          <p>{userDetails?.city}</p>
        </div>

        <div className='flex'>
          <h3 className='font-semibold'>Email:&nbsp;</h3>
          <p>{userDetails?.email}</p>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='flex shadow-sm border justify-between px-8 text-lg font-semibold py-2'>
          <h4 onClick={()=>handleTabClick("Education")} className={`${detailsTab==="Education"?'text-blue-500':'text-black'} hover:text-blue-500 cursor-pointer duration-200`}>Education</h4>
          <h4 onClick={()=>handleTabClick("Skills")} className={`${detailsTab==="Skills"?'text-blue-500':'text-black'} m-auto hover:text-blue-500 cursor-pointer duration-200`}>Skills</h4>
          <h4 onClick={()=>handleTabClick("Experience")} className={`${detailsTab==="Experience"?'text-blue-500':'text-black'} hover:text-blue-500 cursor-pointer duration-200`}>Experience</h4>
        </div>

        {detailsTab==='Education' && <EducationDetails data={userDetails?.education}/>}
        {detailsTab==='Skills' && <SkillsDetails data={userDetails?.skills}/>}
        {detailsTab==='Experience' && <ExperienceDetails data={userDetails?.experience}/>}
      </div>
    </div>
    </>
  )
}

export default JobseekerProfile
