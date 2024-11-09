import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserSignUp } from '../../../../utils/types/api-types';
import { userSignUp } from '../../../../services/axios.PostMethods';
import SignUpForm from './SignUpForm';
import OtpVerificationForm from './OtpVerificationForm';
import { useUserSignUpForm } from '../../../../utils/validations/user-validations/userSignupValidation';
import { useLoading } from '../../../../contexts/LoadingContext';



const SignUp: React.FC = () => {

    const { setLoading } = useLoading();
    const [showOtpForm, setShowOtpForm] = useState(false);
    const navigate = useNavigate();
    const { errors, handleSubmit, register, reset } = useUserSignUpForm();

    const handleSignUp = async (data: UserSignUp) => {
        // e.preventDefault();
        try {
            setLoading(true);
            const response = await userSignUp(data);
            toast.success(response?.message);
            setShowOtpForm(true);
          } catch (error) {
            const message = (error as Error).message.replace('Error: ', '');
            toast.error(message);
          }
          finally {
            setLoading(false); 
            // reset();
        }
      }
    
    const handleOtpVerification = (otp: string) => {
        console.log('OTP submitted:', otp);
        navigate('/login');
    };

  return (
    <div className='bg-[#001F23] relative h-screen flex items-center justify-center'>
      <div className='p-8 flex flex-col md:flex-row items-center justify-center h-[650px] w-[1400px]'>
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
            <p className="md:text-3xl lg:text-4xl text-white font-rubik-wet-paint">
              Welcome To DevFlow
            </p>
          </div>

          <span className="md:border-r-2 md:h-[100%] "></span>

        {/* -------------- right side --------------- */}
          <div className='md:w-1/2 w-full flex flex-col items-center'>
          {showOtpForm ? (
            <OtpVerificationForm onSubmit={handleOtpVerification} />
          ) : (
            <SignUpForm
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              handleSignUp={handleSignUp}
            />
          )}
          </div>
      </div>
  </div>
  )
}


export default SignUp