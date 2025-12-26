import React from 'react'


function PlacementProcess() {
    const steps=[
        {
            title:"Step 1:Online Application",
            description:"Candidate submits resume and fills application form",
        },
        {
            title:"Step 2: Aptitude Test",
            description:"Logical,quantative, and coding Mcqs",
        },
        {
            title:"Step 3:Technical Interview",
            description:"Assessment of technical skills and problem-solving abilities",
        },
        {
            title:"Step 4:HR Interview",
            description:"Evaluation,communication,behaviour,comapny fit",
        },
        {
            title:"Step 5:Final Selection",
            description:"Offer letter to selected candidates",
        }
    ];
  return (
    <div className='p-8 max-w-4xl mx-auto'>
        <h1 className="text-4xl font-bold mb-12 text-center text-white drop-shadow-lg">Placement Process</h1>
        <div className="space-y-6">
            {steps.map((step,index)=>(
                <div key={index} className="bg-slate-800 bg-opacity-70 p-8 shadow-lg rounded-lg border-l-4 border-orange-500 hover:bg-opacity-90 transition">
                    <h2 className="text-2xl font-semibold text-white drop-shadow-md">{step.title}</h2>
                    <p className="text-gray-200 mt-3 text-lg drop-shadow-md">{step.description}</p>
                    </div>
            ))}

        </div>

        
      
    </div>
  )
}

export default PlacementProcess
