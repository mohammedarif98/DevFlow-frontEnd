import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserSignUp } from '../../../../utils/types/api-types';


interface SignUpFormProps {
  register: any;
  errors: any;
  handleSubmit: any;
  handleSignUp: (data: UserSignUp) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  errors,
  handleSubmit,
  register,
  handleSignUp,
}) => (
  <form className='w-3/4' onSubmit={handleSubmit(handleSignUp)}>

    <div className=''>
      <p className='text-2xl text-white font-semibold tracking-[0.1em] font-arsenal-sc-regular mb-6 text-center'>Create An Account</p>
    </div>

    <div className='mb-1'>
      <label htmlFor='username' className='block text-white font-semibold mb-2'>
        Username
      </label>
      <input
        type='text'
        id='username'
        {...register('username')}
        className='w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none focus:ring-0'
        placeholder='Enter your username'
        required
      />
      {errors.username && (
        <span className='text-sm font-normal text-red-600'>{errors.username.message}</span>
      )}
    </div>

    <div className='mb-1'>
      <label htmlFor='email' className='block text-white font-semibold mb-2'>
        Email
      </label>
      <input
        type='email'
        id='email'
        {...register('email')}
        className='w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none focus:ring-0'
        placeholder='Enter your email'
        required
      />
      {errors.email && (
        <span className='text-sm font-normal text-red-600'>{errors.email.message}</span>
      )}
    </div>

    <div className='mb-1'>
      <label htmlFor='password' className='block text-white font-semibold mb-2'>
        Password
      </label>
      <input
        type='password'
        id='password'
        {...register('password')}
        className='w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none focus:ring-0'
        placeholder='Enter your password'
        required
      />
      {errors.password && (
        <span className='text-sm font-normal text-red-600'>{errors.password.message}</span>
      )}
    </div>

    <div className='mb-5'>
      <label htmlFor='confirmPassword' className='block text-white font-semibold mb-2'>
        Confirm Password
      </label>
      <input
        type='password'
        id='confirmPassword'
        {...register('confirmPassword')}
        className='w-full px-3 py-2 border rounded-sm focus:border-black focus:outline-none focus:ring-0'
        placeholder='Confirm your password'
        required
      />
      {errors.confirmPassword && (
        <span className='text-sm font-normal text-red-600'>{errors.confirmPassword.message}</span>
      )}
    </div>

    <button
      type='submit'
      className='w-full bg-red-900 hover:bg-opacity-75 text-white font-base py-2 px-4 rounded focus:outline-none focus:shadow-outline'
    >
      Sign Up
    </button>

    <div className='flex justify-end my-2'>
      <p className='text-sm text-white'>
        Already have an account? <Link to='/login' className='font-semibold'>Login</Link>
      </p>
    </div>

    <div className='flex flex-col items-center'>
      <p className='text-white mb-2'>------------- or -------------</p>
      <button className='flex items-center justify-center w-full bg-gray-50 border border-gray-500 opacity-95 text-black py-2 font-semibold rounded'>
        <FaGoogle className='text-red-800 text-xl mr-2' />
        Sign Up with Google
      </button>
    </div>

  </form>
);

export default SignUpForm;