import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import loginBg3 from '../../assets/images/freepik-export-20241029093300RFZp.jpeg'
import { UserSignUp } from '../../utils/types/api-types';
import { userSignUp } from '../../utils/configs/user-configs/axios.PostMethods';
import { useUserSignUpForm } from '../../utils/validations/user-validations/userSignupValidation';



const SignUp: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { errors, handleSubmit, register, reset } = useUserSignUpForm();

  const handleSignUp = async (data: UserSignUp) => {
    try {
      setLoading(true);
        const response: any = await userSignUp(data);
        console.log(response)
        if (response?.status === 200) {
            navigate("/otp");}
            else{
              console.log("Already existed User")
            }
    } catch (error) {
        console.error("Registration error:", error);
    }
    finally {
      setLoading(false); 
  }
  }

  return (
    <div className='relative flex flex-col md:flex-row h-screen'>
      {/* Small Screen Logo */}
      <div className='absolute top-4 left-4 md:hidden'>
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
      <div className='bg-slate-200 w-full md:w-1/2 h-screen flex flex-col justify-center items-center'>
        <form className='w-[60%] max-w-lg' onSubmit={ handleSubmit(handleSignUp) }>
          <h2 className='text-2xl font-bold mb-6 text-center'>Register User</h2>

          <div className='mb-3'>
            <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>Username</label>
            <input 
              type='text'  
              id='username'
              { ...register("username")} 
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0' 
              placeholder='Enter your username' 
              required 
            />
            {errors.username ? (
              <span className="text-sm font-normal text-red-600 ">
                {errors.username?.message}
              </span>
            ) : null}
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>Email</label>
            <input 
              type='email'  
              id='email' 
              { ...register("email")} 
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0' 
              placeholder='Enter your email' 
              required 
            />
            {errors.email ? (
              <span className="text-sm font-normal text-red-600 ">
                {errors.email?.message}
              </span>
              ) : null}
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>Password</label>
            <input 
              type='password' 
              id='password'
              { ...register("password")} 
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0' 
              placeholder='Enter your password' 
              required 
            />
            {errors.password ? (
              <span className="text-sm font-normal text-red-600 ">
                {errors.password?.message}
              </span>
            ) : null}
          </div>

          <div className='mb-8'>
            <label htmlFor='confirmPassword' className='block text-gray-700 font-semibold mb-2'>confirmPassword</label>
            <input 
              type='Password' 
              id='confirmPassword'
              { ...register("confirmPassword")} 
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0' 
              placeholder='Enter your confirmPassword' 
              required 
            />
            {errors.confirmPassword ? (
              <span className="text-sm font-normal text-red-600 ">
                {errors.confirmPassword?.message}
              </span>
            ) : null}
          </div>

          <button 
            type='submit' 
            className='w-full bg-black hover:bg-opacity-75 text-white font-base py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            SignUp
          </button>

          <div className='flex justify-end my-2'>
            <p className='text-sm'>Already have account? <Link to='/login' className='font-semibold'>Login</Link></p>
          </div>

          <div className='flex flex-col items-center mt-4'>
            <p className='text-black mb-4'>------------- or -------------</p>
            
            <button className='flex items-center justify-center w-full bg-gray-50 border border-gray-500 opacity-95 text-black py-2 font-semibold rounded'>
              <FaGoogle className='text-red-800 text-xl mr-2' />
              SignUp with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



export default SignUp