import React from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
  const navigate = useNavigate()

  const handleContinue = ()=>{
    navigate('/sign-up')
  }
  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
    <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
    <p className="mb-8 text-lg">Please click continue to proceed to login.</p>
    <button
      onClick={handleContinue}
      className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition"
    >
      Continue
    </button>
  </div>
  )
}

export default Start