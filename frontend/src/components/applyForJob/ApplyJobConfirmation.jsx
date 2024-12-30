import React from 'react'
import { showSuccessToast } from '../toasts/SuccessToast';
import { showErrorMessage } from '../toasts/ErrorToast';
import { useNavigate } from 'react-router-dom';

function ApplyJobConfirmation(props) {
    const {jobData,display,answers} = props;
    const navigate = useNavigate();

    const handleApplyButton = async()=>{
        const res = await fetch('http://127.0.0.1:3000/applyForJob',{
            method:"POST",
            body:JSON.stringify({jobAdId:jobData?.id,recruiterId:jobData?.recruiter_id,answers}),
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
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

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[410px]">
        <h2 className="text-lg text-center font-bold mb-6 capitalize">Apply for the job "{jobData?.title}" by "{jobData?.username}" ?</h2>
        <div className='flex justify-around'>
            <button onClick={()=>display(false)} className='bg-gray-500 text-white font-semibold px-8 py-2 rounded-md hover:bg-gray-600 duration-200 active:scale-95'>Cancel</button>
            <button onClick={handleApplyButton} className='bg-blue-500 text-white font-semibold px-8 py-2 rounded-md hover:bg-blue-600 duration-200 active:scale-95'>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default ApplyJobConfirmation
