import React, { useState } from 'react'
import AcceptApplicationCard from './AcceptApplicationCard';
import RejectApplicationCard from './RejectApplicationCard';

function ApplicationMenu(props) {
    const {questions,answers,id,response} = props;
    const [displayAcceptCard,setDisplayAcceptCard] = useState(false);
    const [displayRejectCard,setDisplayRejectCard] = useState(false);

  return (
    <>
    <div className='border p-4 rounded-md h-fit w-full md:max-w-[36%]'>
      <h1 className='text-2xl font-bold text-center'>Answers:</h1>  
      {questions?.map((ele,ind)=>{
        return(
            <div className='' key={ind}>
                <h2 className='font-semibold '>Q{ind+1}. {ele}</h2>
                <p className='flex items-center gap-1'><span className='font-semibold'>Answer:</span>{answers[ind]}</p>
            </div>
        );
      })}

      {response=="pending" && <div className='flex flex-col gap-2 mt-10'>
        <button onClick={()=>setDisplayAcceptCard(true)} className='bg-green-500 py-2 text-white font-semibold rounded-md shadow-md hover:bg-green-600 duration-200'>Accept application</button>
        <button onClick={()=>setDisplayRejectCard(true)} className='bg-red-500 py-2 text-white font-semibold rounded-md shadow-md hover:bg-red-600 duration-200'>Reject application</button>
      </div>}
      {response=="accepted" && <div className='flex mt-6'>
            <button className='w-full bg-green-500 bg-opacity-60 py-2 text-white font-semibold rounded-md shadow-md' disabled>Accepted</button>
        </div>}
        {response=="rejected" && <div className='flex mt-6'>
            <button className='w-full bg-red-500 bg-opacity-60 py-2 text-white font-semibold rounded-md shadow-md' disabled>Rejected</button>
        </div>}


    </div>
    {displayAcceptCard && <AcceptApplicationCard applicationId={id} display={setDisplayAcceptCard}/>}
    {displayRejectCard && <RejectApplicationCard applicationId={id} display={setDisplayRejectCard}/>}
    </>
  )
}

export default ApplicationMenu
