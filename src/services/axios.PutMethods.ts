import axios, { AxiosRequestConfig } from "axios"
import { adminApiRequest } from "./axios.AdminConfig";
import { AddCategoryResponse } from "../utils/types/api-types";
import { userApiClient } from "./axios.UserConfig";




//* ====================== USER API ==========================
// --------------------- user prfile updating ----------------------
export const updateUserProfile = async(formData: FormData): Promise<any> => {
    const config: AxiosRequestConfig = {
        method: "PUT",
        url: '/api/auth/update-profile',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    }
    try{
        const result = await userApiClient(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "User profile updation failed";
        throw new Error(message);
    }
}

//------------------ update the own blogs of user ------------------
export const editBlogPost = async(formData: FormData, blogId: string) => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/api/auth/update-blog-post/${blogId}`,
        headers: {
            'Content-Type':'multipart/form-data'
        },
        data: formData,
    }
    try{
        const result = await userApiClient(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Blog updation failed";
        throw new Error(message);
    }
}


//* ====================== ADMIN API ===========================
//--------------------- block the user -----------------------
export const blockUser = async(userId: string) => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/api/admin/block-user/${userId}`,
    }
    try{
        const result = await adminApiRequest(config);
        return result;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "User Blocking failed";
        throw new Error(message);
    }
}

//--------------------- unblock the user --------------
export const unblockUser = async(userId: string) => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/api/admin/unblock-user/${userId}`,
    }
    try{
        const result = await adminApiRequest(config);
        return result;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "User unBlocking failed";
        throw new Error(message);
    }
}

// ---------------- update the category ---------------
export const editCategory = async(formData: FormData, categoryId: string): Promise<AddCategoryResponse>  =>{
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/api/admin/edit-category/${categoryId}`,
        headers: {
            'Content-Type':'multipart/form-data'
        },
        data: formData
    }
    try{
        const result = await adminApiRequest(config);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Category updating failed";
        throw new Error(message);
    }
}

//----------------- block the blogs -------------------
export const blockBlog = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/api/admin/block-blog/${blogId}`
    }
    try{
        const result = await adminApiRequest(config);
        return result;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Blog Blocking failed";
        throw new Error(message);
    }
}

//----------------- unblock the blogs -------------------
export const unblockBlog = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/api/admin/unblock-blog/${blogId}`
    }
    try{
        const result = await adminApiRequest(config);
        return result;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Blog Unblocking failed";
        throw new Error(message);
    }
}