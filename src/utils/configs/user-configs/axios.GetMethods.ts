import axios, { AxiosRequestConfig } from "axios"
import { apiRequest } from "./axios.config"



//*----------------------- function for resend email otp -------------------------
export const resendOTP = async() => {    
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/api/auth/resendOTP`,
        // data: { otp }
    }
    try{
        const result = await apiRequest(config)
        return result;
    }catch(error){
        let message; 
        if(axios.isAxiosError(error) && error.response?.data?.message) {
            message = error.response.data.message;
          }
        // console.log("OTP verification failed:", message);
        throw new Error(message);
    }
}