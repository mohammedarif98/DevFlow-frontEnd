import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//* ---------------- User Axios instance ---------------------
export const userApiClient = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
	  'Content-Type': 'application/json',
	},
});


//*----------- User Request interceptor to add access token to headers -------------
userApiClient.interceptors.request.use(
    config => {
        const userAccessToken = Cookies.get('user-access-token');
        if (userAccessToken) config.headers['Authorization'] = `Bearer ${userAccessToken}`;
        return config;
    },
    error => Promise.reject(error)
);
 

//* -------------- User response interceptor request with new token if necessary ------------------
userApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await userApiClient.post('/api/auth/user-refresh-token', {}, { withCredentials: true });
                const newUserAccessToken = response.data.accessToken;
                
                Cookies.set('user-access-token', newUserAccessToken, { expires: 15 / (24 * 60) });
                originalRequest.headers.Authorization = `Bearer ${newUserAccessToken}`;
                
                return userApiClient(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh user access token", refreshError);
                Cookies.remove('user-access-token');
                window.location.href = "/login";
                
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


//* ------------------ Function to make API request ---------------------
export const userApiRequest = async( config: AxiosRequestConfig ) => {
    try{
        const response = await userApiClient(config);
        return response;
    }catch( error ){
        // console.error("API call failed", error);
        throw error;
    }
};

