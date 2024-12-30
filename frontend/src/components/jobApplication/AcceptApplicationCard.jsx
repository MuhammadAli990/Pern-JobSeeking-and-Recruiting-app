import React, { useState } from 'react'
import data from '../lib/data.json'
import { showSuccessToast } from '../toasts/SuccessToast';
import { showErrorMessage } from '../toasts/ErrorToast';
import { useNavigate } from 'react-router-dom';

function AcceptApplicationCard(props) {
    const {display,applicationId} = props;
    const [interviewDate,setInterviewDate] = useState('');
    const [interviewTime,setInterviewTime] = useState('');
    const [location,setLocation] = useState({city:'',loc:''});
    const [message,setMessage] = useState('');
    const navigate = useNavigate();

    // check whther the job application id exists in accepted or rejected tables

    const handleApplicationAccept = async(e)=>{
        e.preventDefault();
        const res = await fetch("http://127.0.0.1:3000/acceptJobApplication",{
            method:"POST",
            body:JSON.stringify({id:applicationId,interviewDate,interviewTime,location,message}),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        const result = await res.json();
        if(result.success){
            display(false);
            showSuccessToast(result.message);
            navigate('/dashboard');
        }
        else{
            showErrorMessage(result.message);
        }
    }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleApplicationAccept} className="bg-white p-6 rounded-lg shadow-lg w-[510px] flex flex-col gap-6">
        <h1 className='font-bold text-xl text-center'>Accept application</h1>
        <div className='flex flex-col'>
            <label className='font-bold mb-1 capitalize'>Select date and time for interview:</label>
            <div className='flex gap-2'>
                <input required onChange={(e)=>setInterviewDate(e.target.value)} type="date" className='text-sm outline-none px-2 py-2 border border-zinc-400 border-opacity-60 w-full'/>
                <input required  onChange={(e)=>setInterviewTime(e.target.value)} type="time" className='text-sm outline-none px-2 py-2 border border-zinc-400 border-opacity-60 w-full' />
            </div>
        </div>
        <div className='flex flex-col'>
            <label className='font-bold mb-1 capitalize'>Select location for interview:</label>
            <div className='flex gap-2'>
                <select required onChange={(e)=>setLocation((p)=>({...p,city:e.target.value}))} className='w-full text-sm outline-none px-2 py-2 border border-zinc-400 border-opacity-60'>
                    {data.cities.map((ele,ind)=>{
                        return(<option key={ind}>{ele}</option>);
                    })}
                </select>
                <input required onChange={(e)=>setLocation((p)=>({...p,loc:e.target.value}))} type="text" placeholder='Write exact location' className='w-full text-sm outline-none px-2 py-2 border border-zinc-400 border-opacity-60'/>
            </div>
        </div>
        <div>
            <label className='font-bold mb-1 capitalize'>Send a custom message to job applier:</label>
            <input required onChange={(e)=>setMessage(e.target.value)} type="text" className='w-full text-sm outline-none px-2 py-2 border border-zinc-400 border-opacity-60'/>
        </div>
        <div className='flex gap-2 justify-center'>
            <button onClick={()=>display(false)} className='bg-gray-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-600 duration-200'>Cancel</button>
            <button type='submit' className='bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600 duration-200'>Approve</button>
        </div>
      </form>
    </div>  
  )
}

export default AcceptApplicationCard
