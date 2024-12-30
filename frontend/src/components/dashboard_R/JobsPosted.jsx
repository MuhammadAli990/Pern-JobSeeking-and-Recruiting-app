import React, { useEffect, useState } from 'react'
import JobAdCard from '../Home/JobAdCard'

function JobsPosted(props) {
  const {recruiterId} = props;
  const [jobAds,setJobAds] = useState([]);

  const getData = async()=>{
    const res = await fetch(`http://127.0.0.1:3000/getJobAdsByRecruitersId?id=${recruiterId}`)
    const result = await res.json();
    if(result.success){
      setJobAds(result.data);
    }
  }
  useEffect(()=>{
    getData();
  },[recruiterId])

  return (
    <div className="border py-2 px-2 border-top-0 grid md:grid-cols-2 grid-cols-1 gap-2">
      {jobAds.map((ele,ind)=>{
        return(
          <JobAdCard data={ele} key={ind}/>
        );
      })}
    </div>
  )
}

export default JobsPosted
