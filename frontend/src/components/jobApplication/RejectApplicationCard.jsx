import React from 'react'
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../toasts/SuccessToast';
import { showErrorMessage } from '../toasts/ErrorToast';

function RejectApplicationCard(props) {
    const {display,applicationId} = props;
    const navigate = useNavigate();

    const handleRejectButton = async()=>{
        const res = await fetch("http://127.0.0.1:3000/rejectJobApplication",{
            method:"PATCH",
            body:JSON.stringify({id:applicationId}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result = await res.json();
        if(result.success){
            showSuccessToast(result.message)
            navigate('/dashboard');
        }
        else{
            showErrorMessage(result.message);
        }
    }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] flex flex-col gap-6">
        <h1 className='font-bold text-xl text-center'>Do you really want to reject this application?</h1>
        <div className='flex justify-around'>
            <button onClick={()=>display(false)} className='bg-gray-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-600 duration-200'>Cancel</button>
            <button onClick={handleRejectButton} type='submit' className='bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600 duration-200'>Reject</button>
        </div>
      </div>
    </div>
  )
}

export default RejectApplicationCard
