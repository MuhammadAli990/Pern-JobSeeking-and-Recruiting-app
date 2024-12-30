import React, { useEffect } from 'react'

function AnswerQuestions(props) {
    const {questions,questionsDatatypes,display,confirmCardDisplay,answers,setAnswers} = props;

    const handleSubmit = (e)=>{
        e.preventDefault();
        display(false);
        confirmCardDisplay(true);
    }
    useEffect(()=>{
        setAnswers(new Array(questions.length).fill(''));
    },[])

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-[510px] flex flex-col gap-6">
        <h1 className='font-bold text-2xl'>Please complete the questions:</h1>
        <div className='flex flex-col gap-4'>
        {questions.map((ele,ind)=>{
            return(
                <div key={ind} className='flex flex-col'>
                    <label className='font-bold mb-1'>{ele}</label>
                    <input value={answers[ind]}
                    onChange={(e) => {
                        const updatedAnswers = [...answers];
                        updatedAnswers[ind] = e.target.value; 
                        setAnswers(updatedAnswers);
                    }}
                    required className='border border-black border-opacity-30 outline-none px-2 py-2 text-sm' type={questionsDatatypes[ind]}/>
                </div>
            );
        })}
        </div>
        <div className='flex justify-end gap-2'>
            <button onClick={()=>display(false)} className='bg-gray-500 text-white font-semibold px-8 py-2 rounded-md hover:bg-gray-600 duration-200 active:scale-95'>Cancel</button>
            <button className='bg-blue-500 text-white font-semibold px-8 py-2 rounded-md hover:bg-blue-600 duration-200 active:scale-95'>Next</button>
        </div>
      </form>
    </div>
  )
}

export default AnswerQuestions
