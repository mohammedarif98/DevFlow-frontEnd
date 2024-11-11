import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAdminLoginForm } from "../../../../utils/validations/admin-validations/adminLoginValidation";
import { useLoading } from "../../../../contexts/LoadingContext";
import { AdminLogin } from "../../../../utils/types/api-types";
import { adminLogin } from "../../../../services/axios.PostMethods";
import { login } from '../../../../redux/slices/admin-slice/adminSlice';
import LoginForm from "./LoginForm";



const Login: React.FC = () => {
  const { setLoading } = useLoading();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { errors, register, handleSubmit } = useAdminLoginForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (data: AdminLogin) => {
    try {
      setLoading(true);
      const response = await adminLogin(data);
      dispatch(login(response.admin)); 
      toast.success(response?.message);
      navigate('/admin/dashboard');
    } catch (error) {
      const message = (error as Error).message.replace('Error: ', '');
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0c0720] relative h-screen flex items-center justify-center">
      <div className="p-8 flex flex-col md:flex-row items-center justify-center h-[650px] w-[1400px]">
        {/* -----------Small Screen Logo------------- */}
        <div className="absolute top-5 text-white left-8 md:hidden">
          <Link to="/">
            <span className="font-rubik-wet-paint text-lg md:text-3xl">
              DevFlow
            </span>
          </Link>
        </div>
        {/* -------------- left side --------------- */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2">
          <p className="text-4xl text-white font-rubik-wet-paint">
            DevFlow Admin
          </p>
        </div>

        <span className="md:border-r-2 md:h-96 "></span>

        {/* -------------- right side --------------- */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <LoginForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            handleLogin={handleLogin}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;