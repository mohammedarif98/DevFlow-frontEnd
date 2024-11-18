import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AdminLogin, UserLoginResponse, UserLogin, UserSignUp, AdminLoginResponse, GoogleAuthParams } from "../utils/types/api-types";
import { userApiRequest } from "./axios.UserConfig";
import { adminApiRequest } from "./axios.AdminConfig";


//* =============================== USER API ========================================
// -------- Function to handle user signup ----------
export const userSignUp = async( payload: UserSignUp): Promise<{message: string}> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/register-user`,
        data: payload
    }
    try{
        // return await apiRequest(config);
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "User signup failed";
        throw new Error(message);
    }
};

// --------- function for email otp verification ---------
export const OtpVerification = async( otp: string ): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/verifyOTP`,
        data: { otp }
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
}


// ------- function for user login --------
export const userLogin = async(payload: UserLogin): Promise<UserLoginResponse> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/login-user`,
        data: payload
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "User signup failed";
        throw new Error(message);
    }
}

// --------------- functoin for google login -------------------
export const googleAuthentication = async ({ email, name, photo }: GoogleAuthParams) => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/google-login`,
        data: {
            email,
            name,
            photo,
        },
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Google Authentication failed";
        throw new Error(message);
    }
}

// -------- function for user logout ---------
export const userLogout = async() => {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: `/api/auth/logout-user`,
    }
    try{
        return await userApiRequest(config);
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message : "User Logout failed";
        throw new Error(message);
    }
}




//* ========== ADMIN API =============
// ------------------------- funnction for admin login ------------------------
export const adminLogin = async(payload: AdminLogin): Promise<AdminLoginResponse> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/admin/login-admin',
        data: payload
    }
    try{
        const result = await adminApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Admin login failed";
        throw new Error(message);
    }
}


// -------- function for admin logout ---------
export const adminLogout = async() => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/admin/logout-admin'
    }
    try{
        return await adminApiRequest(config);
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message : "Admin Logout failed";
        throw new Error(message);
    }
}