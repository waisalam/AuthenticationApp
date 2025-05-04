import React, { useContext } from "react";
import { UsercontextData } from "../Usercontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { user, setUser } = useContext(UsercontextData);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Send logout request to the server to clear the cookie
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          } // Include credentials to clear cookie on the server
        );

        // If the response is successful, remove token and user data
        if (response.status === 200) {
          setUser(null); // Clear the user context
          localStorage.removeItem("token"); // Remove token from local storage
          navigate("/login"); // Redirect to login page
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
        {user ? (
          <p className="text-lg text-gray-700">
            Hello,{" "}
            <span className="font-semibold">
              {user?.fullname?.firstname} {user?.fullname?.lastname}
            </span>
            !
          </p>
        ) : (
          <p className="text-gray-700">You are not logged in!</p>
        )}

        <p className="mt-4 text-gray-600">
          Your email: <span className="font-semibold">{user?.email}</span>
        </p>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
