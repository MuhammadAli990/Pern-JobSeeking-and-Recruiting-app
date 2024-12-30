import React from 'react'
import Navbar from '../Home/Navbar'
import Profile from './Profile'
import AppliedJobs from './AppliedJobs'

function Dashboard() {
  return (
    <>
        <Navbar color={'black'}/>
        <div className='pt-20 flex md:flex-row flex-col max-w-[1200px] mx-auto px-4 gap-6'>
          <Profile/>
          <AppliedJobs/>
        </div>
    </>
  )
}

export default Dashboard
