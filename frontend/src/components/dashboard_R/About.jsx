import React from "react";
import DOMPurify from 'dompurify';
import { useState, useEffect } from "react";

function About(props) {
  const { data } = props;
  const [sanitizedData,setSanitizedData] = useState(null);
  useEffect(()=>{
    setSanitizedData(DOMPurify.sanitize(data));
  },[data])

  return <div className="border py-2 px-4 border-top-0" dangerouslySetInnerHTML={{__html:sanitizedData}}></div>;
}

export default About;
