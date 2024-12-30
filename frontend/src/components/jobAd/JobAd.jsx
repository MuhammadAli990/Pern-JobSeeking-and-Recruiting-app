import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { useAuthStore } from '../lib/AuthStore.js';
import AnswerQuestions from '../applyForJob/AnswerQuestions.jsx';
import ApplyJobConfirmation from '../applyForJob/ApplyJobConfirmation.jsx';
import { showErrorMessage } from '../toasts/ErrorToast.js';

function JobAd() {
  const {slug} = useParams();
  const [jobData,setJobData] = useState({});
  const {checkLogin,userInfo} = useAuthStore();
  const [showQuestions,setShowQuestions] = useState(false);
  const [showConfirmcard,setShowConfirmcard] = useState(false);
  const [answers,setAnswers] = useState([]);
  const navigate = useNavigate();

  const getData = async()=>{
    const res = await fetch('http://127.0.0.1:3000/getJobAdByJobId',{
      method:"POST",
      body:JSON.stringify({id:slug}),
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    const result = await res.json();
    if(result.success){
      setJobData(result.data[0]);
    }
    else{
      navigate("/notFound");
    }
  }

  const handleApplyButton = async()=>{
    const res = await fetch('http://127.0.0.1:3000/checkJobAppliedOrNot',{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({jobAdId:jobData.id})
    })
    const result = await res.json();
    if(result.success){
      setShowQuestions(true);
    }
    else{
      showErrorMessage(result.message);
    }
  }

  useEffect(()=>{
    checkLogin();
    getData();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  },[])
  

  return (
    <>
      <Navbar color={'black'}/>
      <div className='px-4 max-w-[1200px] mx-auto py-[70px] flex flex-col gap-2'>

        <Link to={`/recruiter/${jobData.recruiter_id}`} className='flex items-center gap-2'>
          <img className='w-14 h-14 rounded-full' src="/profile.png"/>
          <div className='flex flex-col'>
            <h3 className='font-bold text-xl'>{jobData?.username}</h3>
            <p className='text-sm flex'><p className='font-semibold'>Posted on:&nbsp;</p> {jobData?.postdate}</p>
          </div>
        </Link>

        <div>
          <h2 className='font-extrabold md:text-4xl text-3xl capitalize'>{jobData?.title}</h2>
        </div>

        <div className='text-xs flex flex-wrap gap-1'>
          {jobData?.requiredskills?.map((ele,ind)=>{
            return(
              <p key={ind} className='bg-gray-700 text-white font-semibold rounded-md px-4 py-1'>{ele}</p>
            )
          })}
        </div>

        <div className='flex flex-col'>
          <h4 className='font-bold text-lg'>Job Description:</h4>
          <p className='text-sm' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(jobData.description)}}></p>
        </div>

        <div className='grid justify-between md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2'>
          <div className='flex gap-1 border shadow-sm px-3 py-1 rounded-xl shadow-slate-200 justify-center'>
            <h4 className='font-bold'>Salary: </h4>
            <p>{jobData?.salary} {jobData?.currency} {jobData?.salarytype}</p>
          </div>
          <div className='flex gap-1 border shadow-sm px-3 py-1 rounded-xl shadow-slate-200 justify-center'>
            <h4 className='font-bold'>Job Role: </h4>
            <p>{jobData?.jobrole}</p>
          </div>
          <div className='flex gap-1 border shadow-sm px-3 py-1 rounded-xl shadow-slate-200 justify-center'>
            <h4 className='font-bold'>Job Type: </h4>
            <p>{jobData?.jobtype}</p>
          </div>
          <div className='flex gap-1 border shadow-sm px-3 py-1 rounded-xl shadow-slate-200 justify-center'>
            <h4 className='font-bold'>Min. Education: </h4>
            <p>{jobData?.minedu}</p>
          </div>
        </div>

        <div className='flex flex-col'>
          <h4 className='font-bold text-lg'>Skills Required:</h4>
          <p className='text-sm' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(jobData?.aboutrequiredskills)}}></p>
        </div>

        <div className='flex flex-col'>
          <h4 className='font-bold text-lg'>Experience Required:</h4>
          <p className='text-sm' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(jobData?.experience)}}></p>
        </div>

        <div className='flex justify-between'>
          <div className='flex gap-1'>
            <h4 className='font-bold'>Location: </h4>
            <p>{jobData.location}</p>
          </div>
          <div className='flex gap-1'>
            <h4 className='font-bold'>Deadline: </h4>
            <p>{jobData?.deadline}</p>
          </div>
        </div>

        {userInfo?.jobRole!=="recruiter" && <button onClick={handleApplyButton} className='flex bg-blue-500 text-white font-bold text-lg justify-center py-2 rounded-lg shadow-md hover:bg-blue-600 duration-200 active:scale-95'>
          Apply
        </button>}

        {showQuestions && <AnswerQuestions questions={jobData?.questions} questionsDatatypes={jobData?.questionsdatatype} display={setShowQuestions} confirmCardDisplay={setShowConfirmcard} answers={answers} setAnswers={setAnswers}/>}  

        {showConfirmcard && <ApplyJobConfirmation jobData = {jobData} answers={answers} display={setShowConfirmcard}/>}

      </div>
    </>
  )
}

export default JobAd
