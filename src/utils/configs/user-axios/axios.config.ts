import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


//* ------------ Configure the main Axios instance with default settings ---------------------
export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	// timeout: 5000,
	withCredentials: true,
	headers: {
	  'Content-Type': 'application/json',
	},
  });


//*----------- request interceptor -------------
axiosInstance.interceptors.request.use(
    config => {
        const accessToken = Cookies.get('access-token');
        if(accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    error => { return Promise.reject(error) }
);
 

//* -------------- response interceptor ------------------
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                const response = await axios.post('/api/auth/refresh-token', {}, { withCredentials: true });
                const newAccessToken = response.data.accessToken;
                Cookies.set('access-token', newAccessToken, { expires: 15 / (24 * 60) }); // Expires in 15 minutes
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }catch(refreshError){
                console.error("Failed to refresh access token", refreshError);
                Cookies.remove('access-token');
                Cookies.remove('refresh-token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

//* ------------------ Function to make API request ---------------------
export const apiRequest = async( config: AxiosRequestConfig ) => {
    // Create a sanitized config for logging
    const sanitizedConfig = {
        ...config,
        data: {
            ...config.data,
            password: '[REDACTED]', // Mask the password
            confirmPassword: '[REDACTED]', // Mask the confirmPassword
        },
    };
    console.log("API Request Config:", sanitizedConfig);
    try{
        const response = await axiosInstance(config);
        return response;
        // return response.data;
    }catch( error ){
        // console.error("API call failed", error);
        throw error;
    }
};

