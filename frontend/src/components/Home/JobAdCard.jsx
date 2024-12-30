import React from 'react'
import { useNavigate } from 'react-router-dom';

function JobAdCard(props) {
    const {data} = props;
    const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/jobAd/${data.id}`)} className='border shadow-sm py-2 px-4 flex flex-col rounded-md cursor-pointer hover:shadow-md duration-200'>
        <div className='flex gap-2 items-center border-b pb-2'>
            <img className='w-10 h-10 rounded-full' src="/profile.png"/>
            <h3 className='font-bold text-lg'>{data.username}</h3>
        </div>

        <div className='border-b py-2'>
            <p className='text-sm font-bold'>{data.title}</p>
        </div>

        <div className='border-b py-2 flex justify-between text-sm'>
            <div className='flex items-center gap-1'>
                <h5 className='font-bold'>Job Type:</h5>
                <p>{data.jobtype}</p>
            </div>
            <div className='flex items-center gap-1'>
                <h5 className='font-bold'>Role:</h5>
                <p>{data.jobrole}</p>
            </div>
        </div>

        <div className='flex gap-1 pt-2 text-sm'>
            <h4 className='font-bold'>Min. Edu:</h4>
            <p>{data.minedu}</p>
        </div>

        <div className='flex flex-wrap gap-1 pt-2'>
            {data.requiredskills.slice(0,4).map((ele,ind)=>{
                return(<p className='px-2 py-1 text-xs font-semibold bg-gray-700 text-white rounded-lg' key={ind}>{ele}</p>)
            })}
        </div>
    </div>
  )
}

export default JobAdCard
