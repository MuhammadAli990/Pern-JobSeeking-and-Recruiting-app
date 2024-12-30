import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import JobAdCard from '../Home/JobAdCard';
import { useState } from 'react';
import Navbar from '../Home/Navbar';
import JobseekerProfileCard from '../profile/JobseekerProfileCard';
import RecruiterProfileCard from '../profile/RecruiterProfileCard';

function Search() {
    const {slug} = useParams();
    const [tab,setTab] = useState('Jobs')
    const [jobs,setJobs] = useState([]);
    const [jobSeekers,setJobSeekers] = useState([]);
    const [recruiters,setRecruiters] = useState([])

    const getResults = async()=>{
      const res = await fetch(`http://localhost:3000/search?searchText=${slug}`);
      const result = await res.json();
      console.log(result);
      if(result.success){
        setJobs(result.jobs);
        setJobSeekers(result.jobSeekers);
        setRecruiters(result.recruiters);
      }
    }
    useEffect(()=>{
      getResults();
    },[slug])

  return (
    <>
      <Navbar color='black'/>
      <div className='max-w-[1000px] mx-auto gap-4 px-4 pt-20'>
        <h1 className='font-extrabold text-4xl text-center mb-4'>Search Results:</h1>
        <div className='flex justify-around border shadow-sm py-2 text-lg font-semibold mb-4'>
          <h4 onClick={()=>setTab('Jobs')} className={`${tab=="Jobs"?"text-blue-600":null} cursor-pointer hover:text-blue-600`}>Jobs</h4>
          <h4 onClick={()=>setTab('Job Seekers')} className={`${tab=="Job Seekers"?"text-blue-600":null} cursor-pointer hover:text-blue-600`}>Job Seekers</h4>
          <h4 onClick={()=>setTab('Recruiters')} className={`${tab=="Recruiters"?"text-blue-600":null} cursor-pointer hover:text-blue-600`}>Recruiters</h4>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {tab=='Jobs' && jobs.map((ele,ind)=>{
            return(
              <JobAdCard data={ele} key={ind}/>
            );
          })}
          {tab=='Job Seekers' && jobSeekers.map((ele,ind)=>{
            return(
              <JobseekerProfileCard data={ele}/>
            );
          })}
          {tab=='Recruiters' && recruiters.map((ele,ind)=>{
            return(
                <RecruiterProfileCard data={ele}/>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Search
