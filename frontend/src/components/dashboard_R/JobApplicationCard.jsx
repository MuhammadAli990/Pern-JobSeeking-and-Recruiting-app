import React from 'react'
import { useNavigate } from 'react-router-dom';

function JobApplicationCard(props) {
  const {data} = props;
  const navigate = useNavigate();

  return (
    <div className='flex flex-col border-b pb-3 mb-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
            <img className='h-10 w-10 rounded-full' src="/profile.png"/>
            <h4 className='font-semibold'>{data?.username}</h4>
        </div>
        <div className={`${data?.response=="accepted"?"bg-green-500":data?.response=="rejected"?"bg-red-500":"bg-gray-500"} font-semibold px-4 py-1 rounded-full text-sm text-white`}>
            {data?.response}
        </div>
      </div>

      <div>
        <p className='font-bold text-lg'>{data?.title}</p>
      </div>

      <div className='flex items-center justify-between text-sm mt-1'>
        <div className='flex'>
            <h4 className='font-semibold'>Applied:&nbsp;</h4>
            <p>{data?.submitdate}</p>
        </div>
        <div onClick={()=>navigate(`/jobApplication/${data.id}`)} className='flex items-center gap-1 cursor-pointer hover:text-blue-500 text-sm justify-end'>
            <i className="fa-solid fa-share-from-square"></i>
            <p>View application</p>
        </div>
      </div>
    </div>
  )
}

export default JobApplicationCard
