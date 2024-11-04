import React from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserLogin } from "../../../utils/types/api-types";


interface LoginFormProps {
  register: any;
  errors: any;
  handleSubmit: any;
  handleLogin: (data: UserLogin) => void;
  errorMessage?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  register,
  errors,
  handleSubmit,
  handleLogin,
  errorMessage,
}) => (
  <form className="w-[60%] max-w-lg" onSubmit={handleSubmit(handleLogin)}>
    <h2 className="text-2xl font-bold mb-6 text-center">
      Sign in to your Account
    </h2>

    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        {...register("email")}
        className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none focus:ring-0"
        placeholder="Enter your email"
        required
      />
      {errors.email && (
        <span className="text-sm font-normal text-rose-600">
          {errors.email.message}
        </span>
      )}
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
        {...register("password")}
        className="w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none focus:ring-0"
        placeholder="Enter your password"
        required
      />
      {errors.password && (
        <span className="text-sm font-normal text-rose-600">
          {errors.password.message}
        </span>
      )}
      {errorMessage && (
        <span className="text-sm font-normal text-rose-600">{errorMessage}</span>
      )}
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
);

export default LoginForm;
