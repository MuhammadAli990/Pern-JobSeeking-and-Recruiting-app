import React, { useEffect } from 'react'
import JobAdCard from './JobAdCard';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import { useState } from 'react';

function Featured() {
  const [featuredJobs,setFeaturedJobs] = useState([]);

  const getData = async()=>{
    const res = await fetch("http://127.0.0.1:3000/getFeaturedJobAds",{
      method:"GET"
    })
    const result = await res.json();
    if(result.success){
      setFeaturedJobs(result.data);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <ScrollAnimation animateIn='fadeIn' duration={1} className='max-w-[1200px] w-full px-4 mx-auto mt-14 flex flex-col gap-8'>
        <h1 className='text-5xl font-extrabold'>Featured Jobs</h1>

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2'>
            {featuredJobs.map((ele,ind)=>{
                return(
                    <JobAdCard data={ele} key={ind}/>
                );
            })}
        </div>
    </ScrollAnimation>
  )
}

export default Featured
