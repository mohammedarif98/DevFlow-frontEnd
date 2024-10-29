import React from 'react'
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import loginBg3 from '../../../public/images/freepik-export-20241029093300RFZp.jpeg';




const SignUp: React.FC = () => {
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
        <form className='w-[60%] max-w-lg'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Register User</h2>

          <div className='mb-3'>
            <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>Username</label>
            <input 
              type='text'  
              id='username' 
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0' 
              placeholder='Enter your username' 
              required 
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>Email</label>
            <input 
              type='email'  
              id='email' 
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0' 
              placeholder='Enter your email' 
              required 
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>Password</label>
            <input 
              type='password' 
              id='password' 
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0' 
              placeholder='Enter your password' 
              required 
            />
          </div>

          <div className='mb-8'>
            <label htmlFor='confirmPassword' className='block text-gray-700 font-semibold mb-2'>confirmPassword</label>
            <input 
              type='Password' 
              id='confirmPassword' 
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0' 
              placeholder='Enter your confirmPassword' 
              required 
            />
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
            
            <button className='flex items-center justify-center w-full bg-gray-50 border border-gray-500 opacity-95 text-black py-2 rounded'>
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