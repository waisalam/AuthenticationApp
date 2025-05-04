import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { UsercontextData } from "../Usercontext";

const Login = () => {
  const navigate = useNavigate();
const {setUser, user}= useContext(UsercontextData)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email,
      password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userCredentials)
if(response.status === 201){
  const data = response.data;
  setUser(data.user)
  localStorage.setItem('token', data.token)
  navigate('/home')
}

setEmail('')
setPassword('')
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit" // Submit button to trigger the form submission
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/change-password"  // Link to navigate to the register page
            className="text-blue-500 hover:underline"
          >
            Forget your password click here
          </Link>
        </p>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"  // Link to navigate to the register page
            className="text-blue-500 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
