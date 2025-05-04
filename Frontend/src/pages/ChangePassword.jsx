import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UsercontextData } from "../Usercontext";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setverificationCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UsercontextData);

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/otp`, { email });
      if (response.status === 200) {
        setOtpSent(true);
        setMessage("OTP sent to your email.");
      }
    } catch (error) {
      setMessage("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/verify-email`, { email, verificationCode });
      if (response.status === 200) {
        setIsEmailVerified(true);
        setMessage("Email verified! You can now change your password.");
      }
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      oldPassword,
      newPassword,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/change-password`, payload);
      if (response.status === 200) {
        setMessage("Password updated successfully!");
        navigate("/login");
      }
    } catch (error) {
      setMessage("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full px-3 py-2 border rounded"
          required
          disabled={isEmailVerified}
        />

        {otpSent && !isEmailVerified && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={verificationCode}
              onChange={(e) => setverificationCode(e.target.value)}
              className="mb-4 w-full px-3 py-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={verifyOtp}
              className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition mb-4"
            >
              Verify OTP
            </button>
          </>
        )}

        {!otpSent && (
          <button
            type="button"
            onClick={sendOtp}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition mb-4"
          >
            Send OTP
          </button>
        )}

        {isEmailVerified && (
          <>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mb-4 w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-6 w-full px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Change Password
            </button>
          </>
        )}
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
