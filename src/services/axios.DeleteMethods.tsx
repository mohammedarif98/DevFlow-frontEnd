import axios, { AxiosRequestConfig } from "axios";
import { userApiRequest } from "./axios.UserConfig";



//* ----------------- user ------------------------
//----------------- function for unlike blog---------------------
export const UnLikeBlog = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/api/auth/unlike-blog/${blogId}`,
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "unlike blog failed";
        throw new Error(message);
    }
}


//----------------- function for unBookmark blog---------------------
export const unbookmarkBlog = async(blogId: string) => {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/api/auth/unbookmark-blog/${blogId}`,
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "unbookmarking blog failed";
        console.error('Unbookmark blog error:', error);
        throw new Error(message);
    }
}


//----------------- function for unBookmark blog---------------------
export const deleteComment = async(commentId: string) => {
    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/api/auth/delete-comment/${commentId}`,
    }
    try{
        const result = await userApiRequest(config);
        console.log(result.data);
        return result.data;
    }catch(error){
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Deleting the comment failed";
        console.error('Deleting the comment failed:', error);
        throw new Error(message);
    }
}