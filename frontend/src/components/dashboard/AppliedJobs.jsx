import React, { useEffect } from "react";
import AppliedJobCard from "./AppliedJobCard";
import { useState } from "react";

function AppliedJobs() {
  const [applications,setApplications] = useState([]);

  const getData = async()=>{
    const res = await fetch("http://127.0.0.1:3000/getJobApplicationsByJobSeeker",{
      credentials:"include"
    })
    const result = await res.json();
    console.log(result);
    if(result.success){
      setApplications(result.data);
    }
  }

  useEffect(()=>{
    getData();
  },[])


  return (
    <div className="flex flex-col gap-2 md:max-w-[36%] w-full">
      <div className="h-[500px] border shadow-sm rounded-xl overflow-y-scroll flex flex-col">
        {applications.map((ele, ind) => {
          return <AppliedJobCard data={ele} key={ind}/>;
        })}
      </div>
    </div>
  );
}

export default AppliedJobs;
