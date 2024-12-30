import React, { useEffect } from 'react'
import Navbar from '../Home/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import JobseekerProfile from './JobseekerProfile';
import { useState } from 'react';
import ApplicationMenu from './ApplicationMenu';

function JobApplication() {
    const {slug} = useParams();
    const [data,setData] = useState({});
    const navigate = useNavigate();

    const getData = async()=>{
        const res = await fetch("http://127.0.0.1:3000/getJobApplicationById",{
            method:"POST",
            body:JSON.stringify({id:slug}),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        const result = await res.json();
        console.log(result);
        if(result.success){
          setData(result.data);
        }
        else{
          navigate('/notfound');
        }
    }
    useEffect(()=>{
        getData();
    },[])
    
  return (
    <>
      <Navbar color='black'/>
      <div className='flex md:flex-row flex-col pt-20 gap-4 max-w-[1200px] px-4 mx-auto'>
        <JobseekerProfile data={data}/>
        <ApplicationMenu response={data?.response} questions={data?.questions} answers={data?.answers} id={data?.id}/>
      </div>
    </>
  )
}

export default JobApplication
