import React from 'react'

function NotificationCard(props) {
    const {data} = props;

  return (
    <div className='border shadow-sm p-4 rounded-md flex flex-col gap-2'>
      <h3 className='font-semibold text-lg'>Congratulations ❗ Your job application got accepted.</h3>
      <p>Job title: {data?.title}</p>

      <div className='flex gap-2'>
        <div className='border px-4 py-1 text-sm w-full flex rounded-full justify-center'>
            <h4 className='font-semibold'>Interview Date:&nbsp;</h4>
            <p>{data?.interviewdate}</p>
        </div>
        <div className='border px-4 py-1 text-sm w-full flex rounded-full justify-center'>
            <h4 className='font-semibold'>Interview time:&nbsp;</h4>
            <p>{data?.interviewtime} (24-hour format)</p>
        </div>
        <div className='border px-4 py-1 text-sm w-full flex rounded-full justify-center'>
            <h4 className='font-semibold'>Location:&nbsp;</h4>
            <p>{data?.location}</p>
        </div>
      </div>

      <div className='flex'>
        <h4 className='font-semibold'>Message from recruiter:&nbsp;</h4>
        <p>{data?.message}</p>
      </div>
    </div>
  )
}

export default NotificationCard
