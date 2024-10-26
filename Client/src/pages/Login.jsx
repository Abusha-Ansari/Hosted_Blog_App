import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BlogContext } from "../Context/UserContext";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const {setloggedIn} = useContext(BlogContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(import.meta.env.VITE_USER_LOGIN, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
  
     
      if (!response.ok) {
        
        window.alert('Login failed: Invalid email or password');
        return;
      }
  
      const responseData = await response.json();

      localStorage.setItem('token', responseData.token);
      setloggedIn(true);
      window.alert('Login Successful');
      navigate('/');
  
    } catch (error) {
      console.error('Login error:', error);
      window.alert('An error occurred during login.');
      navigate('/login');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email")}
            />
          </div>

    
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password")}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

   
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
