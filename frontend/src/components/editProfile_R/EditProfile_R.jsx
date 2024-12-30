import React, { useEffect, useState } from 'react'
import data from '../lib/data.json'
import Navbar from '../Home/Navbar';
import ReactQuill from 'react-quill';
import { showErrorMessage } from '../toasts/ErrorToast';
import { showSuccessToast } from '../toasts/SuccessToast';

function EditProfile_R(){
    const [profile,setProfile] = useState(null);
    const [username,setUsername] = useState(null);
    const [bio,setBio] = useState(null);
    const [headquarters,setHeadquarters] = useState(null);
    const [industry,setIndustry] = useState(null);
    const [about,setAbout] = useState(null);

    const handleFormSubmit = async(e)=>{
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:3000/editRecruiterProfile',{
          method:"POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({profile,username,bio,industry,about,headquarters}),
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

    const getAndSetUserData = async()=>{
        const res = await fetch('http://127.0.0.1:3000/getUserData',{
          method:"GET",
          credentials:"include"
        })
        const result = await res.json();
        if(result.success){
          setUsername(result.data.username);
          setBio(result.data.bio);
          setHeadquarters(result.data.headquarters);
          setProfile(result.data.profile);
          setIndustry(result.data.industry);
          setAbout(result.data.about);
        }
    }

    useEffect(()=>{
        getAndSetUserData();
    },[])



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
                <label className='text-md font-bold' htmlFor="username">Edit your company's name: </label>
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
            <label htmlFor="location" className='font-bold'>Select your headquarters location:</label>
            <select onChange={(e)=>setHeadquarters(e.target.value)} id='location' className='outline-none text-sm border px-1 py-2 border-zinc-400 border-opacity-60 w-full'>
                <option selected value={headquarters} key={headquarters}>{headquarters==null?"Null":headquarters}</option>
                {data.cities.map((ele,ind)=>{
                    return(
                        <option value={ele} key={ind}>{ele}</option>
                    )
                })}
            </select>
        </div>
        <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="location" className='font-bold'>Select your company's industry:</label>
            <select onChange={(e)=>setIndustry(e.target.value)} id='location' className='outline-none text-sm border px-1 py-2 border-zinc-400 border-opacity-60 w-full'>
                <option selected value={industry} key={industry}>{industry==null?"Null":industry}</option>
                {data.industries.map((ele,ind)=>{
                    return(
                        <option value={ele} key={ind}>{ele}</option>
                    )
                })}
            </select>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <h4 className='font-bold'>Customize your about section:</h4>
        <ReactQuill modules={modules} formats={formats} value={about} onChange={(val)=>setAbout(val)} theme="snow" />
      </div>

      <button className='w-full bg-blue-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-blue-600 active:scale-95 duration-200' type='submit'>Save changes</button>
    </form>
    </>
  )
}

export default EditProfile_R
