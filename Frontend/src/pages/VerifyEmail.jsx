import React, { useState, useContext } from 'react';
import { UsercontextData } from '../Usercontext'; // Context import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { user } = useContext(UsercontextData); // Accessing user from context
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user?.email) {
      // If user email is not found in context
      return alert("No email found. Please sign up again.");
    }

    console.log("Entered code:", verificationCode);

    const verifyUser = {
      email: user.email,  // Getting email from context here
      verificationCode,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/verify-email`,
        verifyUser
      );
      if (response.status === 200) {
        const data = response.data;
        navigate('/home'); // Navigate to home after successful verification
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h1>
        <p className="mb-4 text-gray-700 text-center">
          We sent a verification code to <span className="font-semibold">{user?.email}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Verify Email
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Didn’t get the code? <span className="text-blue-500 hover:underline cursor-pointer">Resend</span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
