import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import data from '../lib/data.json'
import { useState } from 'react';
import Select from 'react-select';
import {showSuccessToast} from '../toasts/SuccessToast'
import {showErrorMessage} from '../toasts/ErrorToast'
import { useNavigate } from 'react-router-dom';

function InputJobAd() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [jobRole,setJobRole] = useState(data.jobRoles[0]);
    const [jobType,setJobType] = useState(data.jobTypes[0]);
    const [minEdu,setMinEdu] = useState(data.educationTypes[0]);
    const [sallery,setSallery] = useState({amount:0,currency:data.currencyTypes[0],salleryType:data.salleryTypes[0]});
    const [experience,setExperience] = useState("");
    const [location,setLocation] = useState(data.cities[0]);
    const [skillsText,setSkillsText] = useState("");
    const [skillsArray,setSkillsArray] = useState([]);
    const [deadline,setDeadline] = useState('');
    const [noOfQuestions,setNoOfQuestion] = useState(0);
    const [questions,setQuestions] = useState([]);
    const navigate = useNavigate();

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:3000/postJobAd',{
            method:"POST",
            body:JSON.stringify({title,description,jobRole,jobType,minEdu,sallery,experience,location,skillsArray,skillsText,deadline,questions}),
            credentials:"include",
            headers:{
                "Content-Type":'Application/json'
            }
        })
        const result = await res.json();
        if(result.success){
            showSuccessToast(result.message);
            navigate('/dashboard');
        }
        else{
            showErrorMessage(result.message);
        }
    }
    const handleSelectSkills = (selectedOptions)=>{
        if(selectedOptions>6)return;
        const array = selectedOptions.map((ele,_)=>{return ele.value})
        console.log(array);
        setSkillsArray(array);
    }
    const handleNoOfQuestions = (e)=>{
        if(!e.target.value){
            setNoOfQuestion("");
            return;
        }
        const val = parseInt(e.target.value,10)
        setNoOfQuestion(val);
        setQuestions(new Array(val).fill({question:"",dataType:'text'}))
    }

  return (
    <div className='max-w-[1000px] mx-auto px-4 py-20'>
      <h1 className='font-extrabold md:text-5xl text-4xl text-center'>Post a job ad 📝</h1>

      <form onSubmit={handleFormSubmit} className='flex flex-col gap-6 mt-4'>
        <div className='flex flex-col'>
            <label htmlFor="jobTitle" className='font-bold mb-1'>Enter title of job: </label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} required pattern='^\S(\s?\S)*$' title='No extra spaces allowed.' type="text" id="jobTitle" className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm'/>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="jobTitle" className='font-bold mb-1'>Write a brief description of job: </label>
            <ReactQuill value={description} onChange={(value)=>setDescription(value)}/>
        </div>

        <div className='flex gap-4 md:flex-row flex-col'>
            <div className='flex flex-col w-full'>
                <label className='font-bold mb-1' htmlFor=''>Select a job role:</label>
                <select value={jobRole} onChange={(e)=>setJobRole(e.target.value)} required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm'>
                    {data.jobRoles.map((ele,ind)=>{
                        return(<option value={ele} key={ind}>{ele}</option>)
                    })}
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label className='font-bold mb-1' htmlFor=''>Select a job type:</label>
                <select value={jobType} onChange={(e)=>setJobType(e.target.value)} required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm'>
                    {data.jobTypes.map((ele,ind)=>{
                        return(<option value={ele} key={ind}>{ele}</option>)
                    })}
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label className='font-bold mb-1' htmlFor=''>Select minimum education required:</label>
                <select value={minEdu} onChange={(e)=>setMinEdu(e.target.value)} required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm'>
                    {data.educationTypes.map((ele,ind)=>{
                        return(<option value={ele} key={ind}>{ele}</option>)
                    })}
                </select>
            </div>
        </div>

        <div className='flex md:flex-row flex-col gap-4'>
            <div className='flex flex-col w-full'>
                <label className='font-bold mb-1' htmlFor=''>Enter salary:</label>
                <input value={sallery.amount} onChange={(e)=>setSallery((p)=>({...p,amount:e.target.value}))} required type="number" className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm' />
            </div>
            <div className='flex flex-col w-full'>
                <label className='font-bold mb-1' htmlFor=''>Choose currency:</label>
                <select value={sallery.currency} onChange={(e)=>setSallery((p)=>({...p,currency:e.target.value}))} required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm'>
                    {data.currencyTypes.map((ele,ind)=>{
                        return(<option value={ele} key={ind}>{ele}</option>)
                    })}
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label className='font-bold mb-1' htmlFor=''>Select sallery type:</label>
                <select value={sallery.salleryType} onChange={(e)=>setSallery((p)=>({...p,salleryType:e.target.value}))} required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm'>
                    {data.salleryTypes.map((ele,ind)=>{
                        return(<option value={ele} key={ind}>{ele}</option>)
                    })}
                </select>
            </div>
        </div>

        <div className='flex gap-1 flex-col'>
            <label className='font-bold' htmlFor=''>Select required skills:</label>
            <Select onChange={handleSelectSkills} isOptionDisabled={(option) => skillsArray.length >= 6 && !skillsArray.includes(option)} isMulti options={data.skills_required} required className='text-sm outline-none' placeholder="Search"/>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="jobTitle" className='font-bold mb-1'>Write about required skills: </label>
            <ReactQuill value={skillsText} onChange={(value)=>setSkillsText(value)}/>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="jobTitle" className='font-bold mb-1'>Write about experience required: </label>
            <ReactQuill value={experience} onChange={(value)=>setExperience(value)}/>
        </div>

        <div className='flex flex-col'>
            <label className='font-bold mb-1' htmlFor=''>Enter number of questions you want to ask in job application:</label>
            <input value={noOfQuestions} min='1' step='1' onChange={(e)=>{handleNoOfQuestions(e)}} required type="number" className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm' />
        </div>

        <div className='flex flex-col w-full gap-6'>
            {questions.map((ele,ind)=>{
                return(
                    <div key={ind} className='flex w-full gap-4'>
                        <div className='flex flex-col w-full'>
                            <label className='font-bold mb-1'>Write the question:</label>
                            <input value={questions[ind].question} onChange={(e)=>setQuestions(p => p.map((q, i) => i === ind ? { ...q,question: e.target.value }:q))} required type="text" className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm' />
                        </div>
                        <div className='flex flex-col w-full'>
                            <label className='font-bold mb-1'>Select format in which user have to answer:</label>
                            <select value={questions[ind].dataType} onChange={(e) => setQuestions(p => p.map((q, i) => i === ind ? { ...q, dataType: e.target.value } : q))} required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm'>
                                <option value='text'>Text</option>
                                <option value='number'>Number</option>
                            </select>
                        </div>
                    </div>
                )
            })}
        </div>

        <div className='flex gap-4 md:flex-row flex-col'>
            <div className='flex flex-col w-full'>
                <label className='font-bold mb-1' htmlFor=''>Select job location:</label>
                <select value={location} onChange={(e)=>setLocation(e.target.value)} required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm'>
                    {data.cities.map((ele,ind)=>{
                        return(<option value={ele} key={ind}>{ele}</option>)
                    })}
                    <option value={'remote'}>Remote</option>
                </select>
            </div>
            <div className='flex flex-col w-full'>
                <label className='font-bold mb-1' htmlFor="">Select deadline:</label>
                <input value={deadline} onChange={(e)=>setDeadline(e.target.value)} min={new Date().toISOString().split('T')[0]} required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm' type="date"/>
            </div>
        </div>

        <button className='bg-blue-500 py-2 w-full font-bold mt-2 text-white text-lg rounded-md hover:bg-blue-600 active:scale-95 duration-200'>Post Ad</button>

      </form>

    </div>
  )
}

export default InputJobAd
