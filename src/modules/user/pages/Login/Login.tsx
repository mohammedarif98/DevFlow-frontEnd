import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import { toast } from "react-toastify";
import { useUserLoginForm } from "../../../../utils/validations/user-validations/userLoginValidation";
import { useLoading } from "../../../../contexts/LoadingContext";
import { UserLogin } from "../../../../utils/types/api-types";
import { userLogin } from "../../../../services/axios.PostMethods";
import { login } from "../../../../redux/slices/userSlice/userSlice";



const Login: React.FC = () => {
  const { setLoading } = useLoading();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { errors, register, handleSubmit } = useUserLoginForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleLogin = async (data: UserLogin) => {
      try {
        setLoading(true);
        const response = await userLogin(data);
        dispatch(login(response.user));
        toast.success(response?.message);
        navigate('/');
    } catch (error) {
        const message = (error as Error).message.replace('Error: ', '');
        setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#001F23] relative h-screen flex items-center justify-center">
      <div className="p-8 flex flex-col md:flex-row items-center justify-center h-[650px] w-[1400px]">
      {/*---------- Small Screen Logo -----------*/}
        <div className="absolute top-4 left-4 md:hidden">
          <Link to="/">
            <span className="font-rubik-wet-paint text-white text-lg md:text-3xl">
              DevFlow
            </span>
          </Link>
        </div>

      {/* ------------Left Side------------ */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2">
            <p className="md:text-3xl lg:text-4xl text-white font-rubik-wet-paint">
            Welcome To DevFlow
            </p>
        </div>

        <span className="md:border-r-2 md:h-[80%] "></span>

      {/* ------------Right Side------------ */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <LoginForm
            register = {register}
            errors = {errors}
            handleSubmit = {handleSubmit}
            handleLogin = {handleLogin}
            errorMessage = {errorMessage} 
          />
          {/* { loading && <LoadingSpinner/>} */}
        </div>
      </div>
    </div>
  );
};

export default Login;
