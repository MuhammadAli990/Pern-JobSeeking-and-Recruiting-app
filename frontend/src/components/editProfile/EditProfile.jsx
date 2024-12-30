import React, { useEffect } from 'react'
import data from '../lib/data.json'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { showSuccessToast } from '../toasts/SuccessToast';
import { showErrorMessage } from '../toasts/ErrorToast';
import Navbar from '../Home/Navbar';

function EditProfile() {
    const [username,setUsername] = useState(null);
    const [bio,setBio] = useState(null);
    const [role,setRole] = useState(null);
    const [city,setCity] = useState(null);
    const [skills,setSkills] = useState(null);
    const [experience,setExperience] = useState(null);
    const [education,setEducation] = useState(null);
    const [profile,setProfile] = useState(null);

    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]

    const getAndSetUserData = async()=>{
      const res = await fetch('http://127.0.0.1:3000/getUserData',{
        method:"GET",
        credentials:"include"
      })
      const result = await res.json();
      if(result.success){
        setUsername(result.data.username);
        setBio(result.data.bio);
        setRole(result.data.jobrole);
        setCity(result.data.city);
        setSkills(result.data.skills);
        setExperience(result.data.experience);
        setEducation(result.data.education);
        setProfile(result.data.profile);
      }
    }

    const handleFormSubmit = async(e)=>{
      e.preventDefault();
      const res = await fetch('http://127.0.0.1:3000/editJobSeekerProfile',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({profile,username,bio,role,city,skills,experience,education}),
        credentials:"include"
      })
      const result = await res.json();
      if(result.success){
        showSuccessToast(result.message);
      }
      else{
        showErrorMessage(result.message);
      }
    }

    useEffect(()=>{
      getAndSetUserData();
    },[])


  return (
    <>
    <Navbar color='black'/>
    <form onSubmit={handleFormSubmit} className='max-w-[850px] mx-auto px-4 py-6 flex flex-col gap-6 pt-20'>
      <h1 className='font-extrabold md:text-6xl text-4xl text-center'>Edit your Profile ✨</h1>

      <div className='flex md:flex-row flex-col items-center gap-6 border-b pb-6'>
        <div className='flex flex-col items-center flex-shrink-0'>
            <label htmlFor='profileImg' className='relative cursor-pointer'>
              <div className='w-32 h-32 overflow-hidden'>
                <img className='rounded-full object-cover w-full h-full' src={profile!=null? URL.createObjectURL(profile) : "/profile.png"} />
              </div>
              <div className='absolute bottom-0 right-0 text-gray-600 text-3xl'><i className="fa-solid fa-image"></i></div>
            </label>
            <input accept="image/*" type="file" onChange={(e)=>setProfile(e.target.files[0])} id='profileImg' className='hidden'/>
        </div>
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col gap-1'>
                <label className='text-md font-bold' htmlFor="username">Change your username: </label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} pattern="^[A-Za-z]+( [A-Za-z]+)*$" title='No number or extra space' className='text-sm outline-none px-2 py-2 border border-zinc-400 border-opacity-60' type="text" id='username'/>
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-md font-bold' htmlFor="bio">Update your bio/description:</label>
                <textarea maxLength={360} value={bio} onChange={(e)=>setBio(e.target.value)}  className='text-sm outline-none border p-2 border-zinc-400 border-opacity-60' id="bio"></textarea>
            </div>
        </div>
      </div>
      
      <div className='flex gap-4 border-b'>
        <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="jobRole" className='font-bold'>Select your role:</label>
            <select onChange={(e)=>setRole(e.target.value)} id='jobRole' className='outline-none text-sm border px-1 py-2 border-zinc-400 border-opacity-60 w-full'>
                <option selected value={role} key={role}>{role==null?"Null":role}</option>
                {data.jobRoles.map((ele,ind)=>{
                    return(
                        <option value={ele} key={ind}>{ele}</option>
                    )
                })}
            </select>
        </div>
        <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="location" className='font-bold'>Select your city:</label>
            <select onChange={(e)=>setCity(e.target.value)} id='location' className='outline-none text-sm border px-1 py-2 border-zinc-400 border-opacity-60 w-full'>
                <option selected value={city} key={city}>{city==null?"Null":city}</option>
                {data.cities.map((ele,ind)=>{
                    return(
                        <option value={ele} key={ind}>{ele}</option>
                    )
                })}
            </select>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='font-bold'>Customize your skills section:</h4>
        <ReactQuill modules={modules} formats={formats} value={skills} onChange={(val)=>setSkills(val)} theme="snow" />
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='font-bold'>Customize your education section:</h4>
        <ReactQuill modules={modules} formats={formats} value={education} onChange={(val)=>setEducation(val)}  theme="snow" />
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='font-bold'>Customize your experience section:</h4>
        <ReactQuill modules={modules} formats={formats} value={experience} onChange={(val)=>setExperience(val)} theme="snow" />
      </div>

      <button className='w-full bg-blue-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-blue-600 active:scale-95 duration-200' type='submit'>Save changes</button>
    </form>
    </>
  )
}

export default EditProfile
