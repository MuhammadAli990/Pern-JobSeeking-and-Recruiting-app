import React from 'react'
import { Link } from 'react-router-dom';

function RecruiterProfileCard(props) {
    const {data} = props;

  return (
    <Link to={`/recruiter/${data?.id}`} className='border shadow-sm p-4 flex flex-col gap-2 hover:shadow-md duration-200 rounded-md'>
      <div className='flex gap-2 items-center'>
        <div>
            <img className='w-14 h-14 rounded-full' src="/profile.png" alt="" />
        </div>
        <div className='flex flex-col'>
            <h3 className='text-lg font-bold'>{data?.username}</h3>
            <p className='text-sm'>{data?.email}</p>
        </div>
        <div className='ml-auto bg-purple-500 text-white font-semibold px-4 py-1 rounded-full'>
            Recruiter
        </div>
      </div>
      <div>
        <p className='leading-5 text-sm'>
            {data?.bio}
        </p>
      </div>
    </Link>
  )
}

export default RecruiterProfileCard
