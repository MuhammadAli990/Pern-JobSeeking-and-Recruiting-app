import React, { useEffect, useState } from 'react'
import JobApplicationCard from './JobApplicationCard'

function JobApplications() {
  const [applications,setApplications] = useState([]);
  const getData = async()=>{
    const res = await fetch("http://127.0.0.1:3000/getJobApplicationsByRecruiter",{
      credentials:"include"
    })
    const result = await res.json();
    if(result.success){
      setApplications(result.data);
    }
  }
  useEffect(()=>{
    getData();
  },[])

  return (
    <div className='px-4 py-4 md:max-w-[36%] border rounded-lg w-full h-screen overflow-y-scroll'>
      {applications.map((ele,ind)=>{
        return(
          <JobApplicationCard data={ele} key={ind}/>
        );
      })}
    </div>
  )
}

export default JobApplications
