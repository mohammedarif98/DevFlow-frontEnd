import axios, { AxiosRequestConfig } from "axios"
import { userApiRequest } from "./axios.UserConfig"
import { adminApiRequest } from "./axios.AdminConfig";


//* ========================= USER API ============================
//------------------ function for resend email otp ----------------------
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


//-----------------------  get all Blogs ---------------------------
export const getAllBlogs = async() => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/api/auth/get-blogs`
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "failed to fetch blogs";
        throw new Error(message);
    }
}


// ------------- get all category -----------------
export const getAllCategories = async() => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/auth/get-category`
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error:any){
        if (error.response?.status === 401) {
            throw new Error('failed to fetch categories');
        }
        throw error;
    }
} 


// ------------- get all category -----------------
export const getUsers = async() => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/auth/get-users`
    }
    try{
        const result = await userApiRequest(config);
        // console.log(result.data);
        return result.data;
    }catch(error:any){
        if (error.response?.status === 401) {
            throw new Error('failed to fetch users');
        }
        throw error;
    }
} 


//-----------------------  get Blog detail ---------------------------
export const getUserBlog = async() => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: 'api/auth/get-user-blog'
    }
    try{
        const response = await userApiRequest(config);
        return response.data
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "failed to fetch user blogs";
        throw new Error(message);
    }
}

//-----------------------  get Blog detail ---------------------------
export const getBlogDetail = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/api/auth/get-blog-detail/${blogId}`
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "failed to fetch blogs";
        throw new Error(message);
    }
}

//------------------ get blog likes count  ----------------
export const getBlogLikeCount = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/auth/get-like-count/${blogId}`
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "failed to fetch blog likes count";
        throw new Error(message);
    }
}

//------------------ get blog comments  ----------------
export const getBlogComments = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/auth/get-comments/${blogId}`
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "failed to fetch blog comments";
        console.log("failed to fetch blog comments", error);
        throw new Error(message);
    }
}


//------------------ get fetch following users details  ----------------
export const getUsersDetails = async(usersId: string) => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/auth/users-datails/${usersId}`
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "failed to fetch users details";
        console.log("failed to fetch users details", error);
        throw new Error(message);
    }
}


//------------------ etch category match of blogs details  ----------------
export const getCategoryMatchBlogs = async(categoryId: string) => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/auth/categories-datails/${categoryId}`
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "failed to fetch category match of blogs details";
        console.log("failed to fetch caegory of blogs details", error);
        throw new Error(message);
    }
}
//------------------ etch category match of blogs details  ----------------
export const getLoginUserData = async() => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/auth/login-user-datails`
    }
    try{
        const result = await userApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "failed to fetch logined user details";
        console.log("failed to fetch logined user details", error);
        throw new Error(message);
    }
}



//* ======================= ADMIN API ============================
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

//------------- function for display all blogs -----------------
export const getBlogsList = async() => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url:  `/api/admin/list-blogs`
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

//------------- function for display detail of selected blogs -----------------
export const getBlogDetails = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/admin/blog-detail/${blogId}`
    }
    try{
        const result = await adminApiRequest(config);
        return result.data;
    }catch(error:any){
        if (error.response?.status === 401) {
            throw new Error('fail to get blog details');
        }
        throw error;
    }
}


//------------- function for display detail of selected blogs -----------------
export const getDashboard = async() => {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `/api/admin/dashboard`
    }
    try{
        const result = await adminApiRequest(config);
        return result.data;
    }catch(error:any){
        if (error.response?.status === 401) {
            throw new Error('fail to get data for dashboard');
        }
        throw error;
    }
}