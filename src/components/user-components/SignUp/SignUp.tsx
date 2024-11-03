import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginBg3 from '../../../assets/images/freepik-export-20241029093300RFZp.jpeg'
import { UserSignUp } from '../../../utils/types/api-types';
import { userSignUp } from '../../../utils/configs/user-axios/axios.PostMethods';
import SignUpForm from '../SignUp/SignUpForm';
import OtpVerificationForm from '../SignUp/OtpVerificationForm';
import { useUserSignUpForm } from '../../../utils/validations/user-validations/userSignupValidation';




const SignUp: React.FC = () => {

    const [loading, setLoading] = useState(false);
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
    <div className='relative flex flex-col md:flex-row h-screen'>
        {/* Small Screen Logo */}
        <div className='absolute top-4 left-4 md:hidden '>
            <Link to='/'>
                <span className='font-rubik-wet-paint text-lg md:text-3xl'>DevFlow</span>
            </Link>
        </div>

        {/* Left Side Background Image */}
        <div className='hidden md:block w-full md:w-1/2 h-screen bg-cover bg-no-repeat bg-center' 
            style={{ backgroundImage: `url(${ loginBg3 })` }}>
            <div className='flex justify-start items-start p-6'>
                <Link to='/'>
                    <span className='font-rubik-wet-paint text-lg md:text-3xl'>DevFlow</span>
                </Link>
            </div>
        </div>
        {/* Right Side Form */}
        <div className='bg-slate-200 w-full md:w-1/2 h-screen  flex flex-col justify-center items-center'>
        {showOtpForm ? (
          <OtpVerificationForm onSubmit={handleOtpVerification} />
        ) : (
          <SignUpForm
            loading={loading}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            handleSignUp={handleSignUp}
          />
        )}
        </div>
  </div>
  )
}


export default SignUp