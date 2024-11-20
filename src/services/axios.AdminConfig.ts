import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//* ----------------- Admin Axios instance ---------------------
export const adminApiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

//* ------------------ Function to make API request ---------------------
export const adminApiRequest = async( config: AxiosRequestConfig ) => {
    try{
        const response = await adminApiClient(config);
        return response;
    }catch( error ){
        // console.error("API call failed", error);
        throw error;
    }
};


//*----------- Admin Request interceptor to add access token to headers -------------
adminApiClient.interceptors.request.use(
    config => {
        const adminAccessToken = Cookies.get('admin-access-token');
        if (adminAccessToken) config.headers['Authorization'] = `Bearer ${adminAccessToken}`;
        return config;
    },
    error => Promise.reject(error)
);


//* -------------- User response interceptor request with new token if necessary ------------------
adminApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await adminApiClient.post('/api/admin/admin-refresh-token', {}, { withCredentials: true });
                const newAdminAccessToken = response.data.accessToken;
                
                Cookies.set('admin-access-token', newAdminAccessToken, { expires: 15 / (24 * 60) });
                originalRequest.headers.Authorization = `Bearer ${newAdminAccessToken}`;
                
                return adminApiClient(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh admin access token", refreshError);
                Cookies.remove('admin-access-token');
                Cookies.remove('admin-refresh-token');
                window.location.href = "/admin/login";
                
                return Promise.reject(refreshError);
            }
        }
        if (error.response?.status === 403) {
            Cookies.remove('admin-access-token');
            Cookies.remove('admin-refresh-token');
            window.location.href = "/admin/login";
        }
        return Promise.reject(error);
    }
);


