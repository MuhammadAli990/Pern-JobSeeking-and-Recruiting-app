import React from 'react'
import { Link } from 'react-router-dom';

function JobseekerProfileCard(props) {
    const {data} = props;

  return (
    <Link to={`/jobseeker/${data?.id}`} className='border shadow-sm p-4 flex flex-col gap-2 hover:shadow-md'>
      <div className='flex gap-2 items-center'>
        <div>
            <img className='w-14 h-14 rounded-full' src="/profile.png" alt="" />
        </div>
        <div className='flex flex-col'>
            <h3 className='text-lg font-bold'>{data?.username}</h3>
            <p className='text-sm'>{data?.email}</p>
        </div>
        <div className='ml-auto bg-teal-500 text-white font-semibold px-4 py-1 rounded-full'>
            Job Seeker
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

export default JobseekerProfileCard
