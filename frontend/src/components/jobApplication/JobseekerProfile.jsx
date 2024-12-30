import React, { useEffect, useState } from 'react'
import EducationDetails from '../dashboard/EducationDetails';
import SkillsDetails from '../dashboard/SkillsDetails';
import ExperienceDetails from '../dashboard/ExperienceDetails';

function JobseekerProfile(props) {
  const {data} = props;
  const [detailsTab, setDetailsTab] = useState('Education');

  const handleTabClick = (p)=>{
    setDetailsTab(p);
  }

  return (
    <div className='md:max-w-[64%] flex flex-col gap-4 w-full'>

      <div className='flex sm:flex-row flex-col justify-center items-center gap-6'>
        <div className='flex-shrink-0'>
          <img className='w-36 h-36 rounded-full' src="/profile.png"/>
        </div>

        <div className='flex flex-col sm:text-left text-center'>
          <h1 className='font-extrabold text-4xl'>{data?.username}</h1>
          <h4 className='text-xl font-semibold'>{data?.role}</h4>
          <p className='text-sm'>{data?.bio}</p>
        </div>
      </div>

      <div className='flex md:flex-row flex-col shadow-sm border justify-evenly py-2 rounded-full'>
        <div className='flex justify-center'>
          <h3 className='font-semibold'>City/State:&nbsp;</h3>
          <p>{data?.city}</p>
        </div>

        <div className='flex justify-center'>
          <h3 className='font-semibold'>Email:&nbsp;</h3>
          <p>{data?.email}</p>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='flex shadow-sm border justify-between px-8 text-lg font-semibold py-2'>
          <h4 onClick={()=>handleTabClick("Education")} className={`${detailsTab==="Education"?'text-blue-500':'text-black'} hover:text-blue-500 cursor-pointer duration-200`}>Education</h4>
          <h4 onClick={()=>handleTabClick("Skills")} className={`${detailsTab==="Skills"?'text-blue-500':'text-black'} m-auto hover:text-blue-500 cursor-pointer duration-200`}>Skills</h4>
          <h4 onClick={()=>handleTabClick("Experience")} className={`${detailsTab==="Experience"?'text-blue-500':'text-black'} hover:text-blue-500 cursor-pointer duration-200`}>Experience</h4>
        </div>

        {detailsTab==='Education' && <EducationDetails data={data?.education}/>}
        {detailsTab==='Skills' && <SkillsDetails data={data?.skills}/>}
        {detailsTab==='Experience' && <ExperienceDetails data={data?.experience}/>}
      </div>
    </div>
  )
}

export default JobseekerProfile

