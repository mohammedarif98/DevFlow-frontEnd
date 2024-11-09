import React, { useRef, useState } from 'react';
import { OtpVerification } from '../../../../services/axios.PostMethods';
import  { resendOTP } from '../../../../services/axios.GetMethods'
// import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';



interface OtpVerificationFormProps {
  onSubmit: (otp: string) => void;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({ onSubmit }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // const navigate = useNavigate();


  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    if (/^\d*$/.test(value) && value.length <= 1) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  //* ----------- resend OTP ---------------
  const handleResendOTP = async() => {
    try{
      const response = await resendOTP();
      toast.success(response.data.message);
    }catch(error){
      const errorMessage = error instanceof Error ? error.message.replace("Error: ", "") : "Failed to resend OTP";
      toast.error(errorMessage);
    }
  };
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    try{
      const response = await OtpVerification(otpString);
      onSubmit(otpString);
      // navigate('/login');
      toast.success(response.data.message);
      setError(null);
    }catch(error){
      const errorMessage = error instanceof Error ? error.message.replace("Error: ", "") : "Failed to resend OTP";
      setError(errorMessage)
    }
  };

  return (
    <div className='bg-slate-100 w-[60%] max-w-lg p-10 rounded-lg'>
      <form className='' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold mb-6 text-center'>Email OTP Verification</h2>

        <div className='flex justify-center mb-6 gap-x-4'>
          {otp.map((digit, index) => (
            <input
              key={index}
              type='text'
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}  // Store reference to each input
              className='w-12 h-12 text-center font-semibold text-lg border bg-slate-300 rounded-md focus:outline-none focus:ring-0 hide-spinners'
              required
            />
          ))}
        </div>
        
        {error && (
          <div className='text-red-500 text-center mb-4'>
            {error}
          </div>
        )}

        <div className='flex justify-end my-2'>
          <p className='font-medium' style={{cursor:'pointer'}} onClick={ handleResendOTP }> Resend OTP?</p>
        </div>

        <button
          type='submit'
          className='w-full bg-black hover:bg-opacity-75 text-white font-base py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerificationForm;