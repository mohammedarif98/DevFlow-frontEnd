import axios, { AxiosRequestConfig } from "axios"
import { adminApiRequest } from "./axios.AdminConfig";




//* =========== USER API ===============
// -------------------------------------------




//* =========== ADMIN API ==============
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


//--------------------- unblock the user -----------------------
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