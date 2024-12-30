import React, { useEffect, useState } from 'react'
import  DOMPurify from 'dompurify'

function SkillsDetails(props) {
  const {data} = props;
  const [sanitizedData,setSanitizedData] = useState(null);
  useEffect(()=>{
    setSanitizedData(DOMPurify.sanitize(data));
  },[])

  return (
    <div className='border py-2 px-4 border-top-0' dangerouslySetInnerHTML={{__html:sanitizedData}}>
    </div>
  )
}

export default SkillsDetails
