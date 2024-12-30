import React from "react";
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"

function HirePeopleSteps() {
  return (
    <ScrollAnimation animateIn='fadeIn' duration={1} className='max-w-[1200px] px-4 mx-auto mt-12 flex flex-col gap-4'>
      <h1 className='text-5xl font-extrabold'>Hire anyone</h1>

      <div className='border shadow-md px-4 py-4'>
        <h3 className='font-bold text-xl'>1. Make an recruiter account <span className='text-2xl'>🎈</span></h3>
        <p>Just simple as entering a username, email & password.</p>
      </div>

      <div className='border shadow-md px-4 py-4'>
        <h3 className='font-bold text-xl'>2. Post a job ad <span className='text-2xl'>📆</span></h3>
        <p>Upload job details, skills, education and experience required, select a job deadline.</p>
      </div>

      <div className='border shadow-md px-4 py-4'>
        <h3 className='font-bold text-xl'>3. Shortlist people from submitted applications <span className='text-2xl'>✒</span></h3>
        <p>View all submitted applications, shortlist people and send them a custom notification.</p>
      </div>

      <div className='border shadow-md px-4 py-4'>
        <h3 className='font-bold text-xl'>4. Get your desired people <span className='text-2xl'>🚀</span></h3>
        <p>Connect with your selected candidates, schedule interview dates, and coordinate next steps.</p>
      </div>
    </ScrollAnimation>
  );
}

export default HirePeopleSteps;
