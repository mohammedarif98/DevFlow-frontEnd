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