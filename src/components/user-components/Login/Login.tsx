import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg3 from "../../../assets/images/freepik-export-20241029093300RFZp.jpeg";
import { useUserLoginForm } from "../../../utils/validations/user-validations/userLoginValidation";
import { toast } from "react-toastify";
import { UserLogin } from "../../../utils/types/api-types";
import LoginForm from "./LoginForm";
import { userLogin } from "../../../utils/configs/user-axios/axios.PostMethods";




const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { errors, register, handleSubmit } = useUserLoginForm();
  const navigate = useNavigate()

  const handleLogin = async (data: UserLogin) => {
      try {
        setLoading(true);
        const response = await userLogin(data);
        toast.success(response?.message);
        navigate('/');
    } catch (error) {
        const message = (error as Error).message.replace('Error: ', '');
        setErrorMessage(message)
    } finally {
      setLoading(false);
    }
  };

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
      {/* Pass all to the LoginForm component */}
        <LoginForm
          loading = {loading}
          register = {register}
          errors = {errors}
          handleSubmit = {handleSubmit}
          handleLogin = {handleLogin}
          errorMessage = {errorMessage} 
        />
      </div>
    </div>
  );
};

export default Login;
