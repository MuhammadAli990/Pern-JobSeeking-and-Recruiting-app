import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from './components/login/Login.jsx';
import Signup from './components/login/Signup.jsx';
import Home from './components/Home/Home.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import JobAd from './components/jobAd/JobAd.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './components/editProfile/EditProfile.jsx';
import EditProfile_R from './components/editProfile_R/EditProfile_R.jsx';
import { useAuthStore } from './components/lib/AuthStore.js';
import ConditionalRenderer from './components/lib/ConditionalRender.jsx';
import DashboardR from './components/dashboard_R/DashboardR.jsx';
import PostJobAd from './components/postJobAd/PostJobAd.jsx';
import JobApplication from './components/jobApplication/JobApplication.jsx';
import Notifications from './components/notifications/Notifications.jsx';
import Search from './components/search/Search.jsx';
import PageNotFound from './components/errorPages/PageNotFound.jsx';
import PrivateRoute from './components/errorPages/PrivateRoute.jsx';
import RecruiterProfile from './components/profile/RecruiterProfile.jsx';
import JobseekerProfile from './components/profile/JobseekerProfile.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:"/dashboard",
    element:<ConditionalRenderer components={{jobSeeker: <Dashboard/>, recruiter: <DashboardR/>}}/>

  },
  {
    path:"/jobAd/:slug",
    element:<JobAd/>
  },
  {
    path:'/editProfile',
    element:(<ConditionalRenderer components={{jobSeeker: <EditProfile />, recruiter: <EditProfile_R />}}/>)
  },
  {
    path:'/postJobAd',
    element:(<ConditionalRenderer components={{jobSeeker:<PrivateRoute/>,recruiter:<PostJobAd/>}}/>)
  },
  {
    path:'/jobApplication/:slug',
    element:(<ConditionalRenderer components={{jobSeeker:<PrivateRoute/>,recruiter:<JobApplication/>}}/>)
  },
  {
    path:'/notifications',
    element:(<ConditionalRenderer components={{jobSeeker:<Notifications/>,recruiter:<PageNotFound/>}}/>)
  },
  {
    path:'/search/:slug',
    element:<Search/>
  },
  {
    path:'/*',
    element:<PageNotFound/>
  },
  {
    path:'/recruiter/:slug',
    element:<RecruiterProfile/>
  },
  {
    path:'/jobSeeker/:slug',
    element:<JobseekerProfile/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
  </StrictMode>
)
