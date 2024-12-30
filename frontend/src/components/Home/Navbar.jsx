import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useAuthStore} from '../lib/AuthStore.js'
import { showSuccessToast } from '../toasts/SuccessToast.js';
import { showErrorMessage } from '../toasts/ErrorToast.js';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
  const {color} = props;
  const {resetLogin,loginState,checkLogin,userInfo} = useAuthStore();
  const [showDropdown,setShowDropdown] = useState(false);
  const [searchText,setSearchText] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    checkLogin();
  },[])

  const handleLogoutButton = async()=>{
    const res = await fetch("http://127.0.0.1:3000/logout",{
      credentials:"include",
      method:"GET"
    })
    const result = await res.json();
    if(result.success){
      showSuccessToast(result.message);
      setShowDropdown(false);
      resetLogin();
    }
    else{
      showErrorMessage(result.message);
    }
  }
  
  const handleSearchButton = async(e)=>{
    if(e.key!=="Enter")return;
    if(searchText==="")return;
    navigate(`/search/${searchText}`);
    
  }


  return (
    <div className='flex justify-between items-center md:px-6 px-4 py-3 shadow-md backdrop-blur-md fixed w-full z-30'>
      <div>
        <h2 className={`font-bold text-2xl ${color==='black'? 'text-black':'text-white'}`}><Link to={'/'}>Joblify</Link></h2>
      </div>

      <div className='flex md:gap-2 gap-1 items-center relative'>
        <div>
            <input onChange={(e)=>setSearchText(e.target.value)} onKeyDown={(e)=>handleSearchButton(e)} placeholder='Search..' className='border border-black outline-none text-sm p-1 px-2 rounded-xl' type="text"/>
        </div>
        {
          loginState===true?
          <div className='flex items-center gap-1'>
            <img onClick={()=>navigate('/dashboard')} src="/profile.png" className='cursor-pointer w-8 h-8 rounded-full'/>
            <i onClick={()=>setShowDropdown(!showDropdown)} className={`fa-solid fa-caret-down ${color=="black"?'text-slate-800':'text-white'} hover:text-gray-200 cursor-pointer text-xl`}></i>
          </div>
          :
          <div>
            <Link to={'/login'} className='bg-blue-500 text-white font-semibold px-4 py-[6px] text-sm rounded-full duration-200 hover:bg-blue-600 active:scale-95'>Login</Link>
          </div>
        }
        {showDropdown===true && <div className='flex flex-col border shadow-sm absolute bg-white right-[-6px] top-10 px-2 py-2 rounded-md font-semibold text-sm'>
          <p onClick={()=>navigate('/editProfile')} className='hover:bg-gray-200 px-3 py-1 rounded-xl cursor-pointer duration-200'>Edit profile</p>
          {userInfo?.jobRole=="recruiter" && <p onClick={()=>navigate('/postJobAd')} className='hover:bg-gray-200 px-3 py-1 rounded-xl cursor-pointer duration-200'>Post a job</p>}
          {userInfo?.jobRole=="jobSeeker" && <p onClick={()=>navigate('/notifications')} className='hover:bg-gray-200 px-3 py-1 rounded-xl cursor-pointer duration-200'>Notifications</p>}
          <p onClick={()=>handleLogoutButton()} className='hover:bg-gray-200 px-3 py-1 rounded-xl cursor-pointer duration-200'>Log-out</p>
        </div>}
      </div>
    </div>
  )
}

export default Navbar
