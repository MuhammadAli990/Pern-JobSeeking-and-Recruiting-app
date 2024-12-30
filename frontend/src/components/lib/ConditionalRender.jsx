import { useEffect } from "react";
import { useAuthStore } from "./AuthStore";
import Loader from './Loader.jsx'
import PrivateRoute from '../errorPages/PrivateRoute.jsx'

const ConditionalRenderer = ({ components }) => {

  const {userInfo,checkLogin,loading} = useAuthStore();
  useEffect(()=>{
    checkLogin();
  },[])
  
  if (userInfo?.jobRole === "recruiter") {
      return components.recruiter;
  }
  else if(userInfo?.jobRole === "jobSeeker"){
      return components.jobSeeker;
  }
  else if(userInfo==null && loading==true){
    return <Loader/>
  }
  else if(userInfo==null && loading!=true){
    return <PrivateRoute/>
  }
  else{
    return <h1>private route</h1>; // 
  }
};

export default ConditionalRenderer;
