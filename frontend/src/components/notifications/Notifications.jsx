import React, { useEffect } from 'react'
import Navbar from '../Home/Navbar';
import NotificationCard from './NotificationCard';
import { useState } from 'react';

function Notifications() {
    const [notifications,setNotification] = useState([]);

    const getNotifications = async()=>{
        const res = await fetch("http://127.0.0.1:3000/getNotifications",{
            method:"GET",
            credentials:"include"
        })
        const result = await res.json();
        if(result.success){
            setNotification(result?.data);
        }
    }
    useEffect(()=>{
        getNotifications();
    },[])
    
  return (
    <>
      <Navbar color='black'/>
      <div className='max-w-[900px] mx-auto px-4 pt-20 flex flex-col gap-6'>
        <h1 className='font-extrabold text-5xl text-center'>Your Notifications 🔔</h1>
        <div className='flex flex-col gap-2'>
            {notifications.map((ele,ind)=>{
                return(
                    <NotificationCard key={ind} data={ele}/>
                );
            })}
        </div>
      </div>
    </>
  )
}

export default Notifications
