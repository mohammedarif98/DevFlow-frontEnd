import React from "react";
import loginBg3 from "../../../assets/images/freepik-export-20241029093300RFZp.jpeg";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";



const Login: React.FC = () => {
  return (
    <div className="relative flex flex-col md:flex-row h-screen">
      {/* Small Screen Logo */}
      <div className="absolute top-4 left-4 md:hidden">
        <Link to="/">
          <span className="font-rubik-wet-paint text-lg md:text-3xl">
            DevFlow
          </span>
        </Link>
      </div>

      {/* Left Side Background Image */}
      <div
        className="hidden md:block w-full md:w-1/2 h-screen bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${loginBg3})` }}
      >
        <div className="flex justify-start items-start p-6">
          <Link to="/">
            <span className="font-rubik-wet-paint text-lg md:text-3xl">
              DevFlow
            </span>
          </Link>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="bg-slate-200 w-full md:w-1/2 h-screen flex flex-col justify-center items-center">
        <form className="w-[60%] max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Sign in to your Account
          </h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-1">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex justify-end mb-6">
            <Link to="" className="text-sm">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>

          <div className="flex justify-end my-2">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold">
                SignUp
              </Link>
            </p>
          </div>

          <div className="flex flex-col items-center mt-4">
            <p className="text-black mb-4">------------- or -------------</p>

            <button className="flex items-center justify-center w-full bg-gray-50 border border-gray-500 opacity-95 text-black py-2 font-semibold rounded">
              <FaGoogle className="text-red-800 text-xl mr-2" />
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
