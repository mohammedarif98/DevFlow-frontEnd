import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { AdminLogin, UserLoginResponse, UserLogin, UserSignUp, AdminLoginResponse, GoogleAuthParams, AddCategoryResponse } from "../utils/types/api-types";
import { userApiRequest } from "./axios.UserConfig";
import { adminApiRequest } from "./axios.AdminConfig";



//* ========================= USER API =============================
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

// ------------- function for creating blog -----------------
export const createBlog = async(formData: FormData) => {
    const config: AxiosRequestConfig = {
        method: "POST",
        url: '/api/auth/blog-post',
        headers: { 
            'Content-Type': 'multipart/form-data',
        },
        data: formData
    }
    try{
        return await userApiRequest(config);
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message : "Creating a blog failed";
        throw new Error(message);
    }
}

//----------------- function for like blog---------------------
export const likeBlog = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/like-blog/${blogId}`,
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "like blog failed";
        throw new Error(message);
    }
}


//----------------- function for bookmarking blog---------------------
export const bookmarkBlog = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/bookmark-blog/${blogId}`,
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "bookmarking blog failed";
        console.error('bookmark blog error:', error);
        throw new Error(message);
    }
}


// ---------------- function for add comment on blog ---------------------
export const addComment = async(blogId: string, content: string) => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/add-comment-blog/${blogId}`,
        data: { content },
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "comment on blog failed";
        console.error('comment on blog error:', error);
        throw new Error(message);
    }
}


// ---------------- function for add comment on blog ---------------------
export const replyToComment = async(blogId: string, commentId: string, replyContent: string) => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/blogs/${blogId}/comments/${commentId}/replies`,
        data: { replyContent }
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "reply to comment on blog failed";
        console.log('reply to comment on blog error:', error);
        throw new Error(message);
    }
}


// ---------------- function for follow the user ---------------------
export const followUser = async(userIdToFollow: string) => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/follow-user/${userIdToFollow}`
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "following a user is failed";
        console.log('following a user is error:', error);
        throw new Error(message);
    }
}


// ---------------- function for follow the category ---------------------
export const followCategory = async(categoryId: string) => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/follow-category/${categoryId}`
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "following a category is failed";
        console.log('following a category is error:', error);
        throw new Error(message);
    }
}





//* ======================= ADMIN API =============================
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
};


//----------- function for adding category -------------
export const addCategory = async(formData: FormData): Promise<AddCategoryResponse> => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/admin/categories',
        headers: { "Content-Type": "multipart/form-data" },
        data: formData
    }
    try{
        const result = await adminApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message : "Addding category failed";
        throw new Error(message);
    }
}


