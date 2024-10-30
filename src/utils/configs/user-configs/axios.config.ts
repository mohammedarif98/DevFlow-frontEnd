import axios, { AxiosRequestConfig } from "axios";



const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Configure the main Axios instance with default settings
export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	withCredentials: true,
	headers: {
	  'Content-Type': 'application/json',
	},
  });


// Function to make API requests
export const apiRequest = async( config: AxiosRequestConfig ) => {
    // Create a sanitized config for logging
    const sanitizedConfig = {
        ...config,
        data: {
            ...config.data,
            password: '[REDACTED]', // Mask the password field
            confirmPassword: '[REDACTED]', // Mask the confirmPassword field if present
        },
    };
    console.log("API Request Config:", sanitizedConfig);
    try{
        const response = await axiosInstance(config);
        return response;
        // return response.data;
    }catch( error ){
        console.error("API call failed", error);
        throw error;
    }
};