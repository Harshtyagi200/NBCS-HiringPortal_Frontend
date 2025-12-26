import React from 'react'
import { useNavigate } from 'react-router-dom'

function Submit() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-md w-full">
        <div className="text-6xl mb-6">✅</div>
        
        <h1 className="text-4xl font-bold text-green-600 mb-3">Success!</h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Your application has been submitted successfully.
        </p>
        
        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-8 text-left">
          <p className="text-green-800 font-semibold mb-1">Thank you for applying!</p>
          <p className="text-green-700 text-sm">
            We have received your application. Our team will review it and contact you soon with updates.
          </p>
        </div>

        <button
          onClick={handleGoHome}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 mb-3"
        >
          Back to Home
        </button>
        
        <p className="text-gray-500 text-sm">
          Check your email for updates
        </p>
      </div>
    </div>
  )
}

export default Submit
