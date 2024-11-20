import axios, { AxiosRequestConfig } from "axios"
import { userApiRequest } from "./axios.UserConfig"
import { adminApiRequest } from "./axios.AdminConfig";


//* ========= USER API =========
//----------------------- function for resend email otp -------------------------
export const resendOTP = async() => {    
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/api/auth/resendOTP`,
        // data: { otp }
    }
    try{
        const result = await userApiRequest(config);
        return result;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "User signup failed";
        throw new Error(message);
    }
};

//----------------------- User Profile ---------------------------
export const getUserProfile = async() => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/auth/profile`
    }
    try{
        const result = await userApiRequest(config);
        return result;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "User signup failed";
        throw new Error(message);
    }
};


//* =========== ADMIN API =============
// ------------------- function for display all users -----------------------
export const getAllUsers = async() => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/api/admin/list-users`
    }
    try{
        const result = await adminApiRequest(config);
        return result;
    }catch(error:any){
        if (error.response?.status === 401) {
            throw new Error('You are not Logged in! please logIn');
        }
        throw error;
    }
}

//------------- function for display all category -----------------
export const getAllCategory = async() => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url:  `/api/admin/list-category`
    }
    try{
        const result = await adminApiRequest(config);
        return result.data;
    }catch(error:any){
        if (error.response?.status === 401) {
            throw new Error('You are not Logged in! please logIn');
        }
        throw error;
    }
} 