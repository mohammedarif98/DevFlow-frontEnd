import { AxiosRequestConfig } from "axios";
import { UserSignUp } from "../../types/api-types";
import { apiRequest } from "./axios.config";



// Function to handle user signup
export const userSignUp = async( signUpPayload: UserSignUp) => {
    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/api/auth/register-user`,
        data: signUpPayload
    }
    try{
        const result = await apiRequest(config);
        return result.data;
    }catch(error){
        console.error("User signup failed:", (error as Error).message);
        throw error;
    }
};