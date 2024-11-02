import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { UserLogin, UserSignUp } from "../../types/api-types";
import { apiRequest } from "./axios.config";



//* --------------------- Function to handle user signup ----------------------------
export const userSignUp = async( signUpPayload: UserSignUp): Promise<{message: string}> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/register-user`,
        data: signUpPayload
    }
    try{
        // return await apiRequest(config);
        const result = await apiRequest(config);
        return result.data;
    }catch(error){
        let message;
        if(axios.isAxiosError(error) && error.response?.data?.message) {
            message = error.response.data.message;
          }
        // console.error("User signup failed:", message);
        throw new Error(message);
    }
};

//*----------------------- function for email otp verification -------------------------
export const OtpVerification = async( otp: string ): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/verifyOTP`,
        data: { otp }
    }
    try{
        const result = await apiRequest(config);
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


//*----------------------- function for login -------------------------
export const userLogin = async(loginPayload: UserLogin): Promise<{ message: string}> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/login-user`,
        data: loginPayload
    }
    try{
        const result = await apiRequest(config);
        //* Ensure the response contains the message field
        return result.data.message ? { message: result.data.message } : { message: "Invalid response from server" };
    }catch(error){
        let message;
        if(axios.isAxiosError(error) && error.response?.data?.message){
            message = error.response.data.message;
        }
        throw new Error(message);
    }
}