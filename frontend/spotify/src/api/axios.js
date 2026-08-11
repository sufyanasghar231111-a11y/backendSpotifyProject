import axios from "axios";
import { getAccessToken, setAccessToken } from "./accessToken";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const refreshApi = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        const status = error.response?.status;

        if (status === 401 && !originalRequest.url?.includes('/rotation/refresh-token')) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise( async (resolve, reject) => {
                try {
                    const refreshResponse = await refreshApi.get('/rotation/refresh-token');
                    const newToken = refreshResponse.data.accessToken;

                    if (!newToken) {
                        throw new Error('Unable to refresh access token');
                    }

                    setAccessToken(newToken);
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    processQueue(null, newToken);
                    resolve(api(originalRequest));
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            });
        }

        return Promise.reject(error);
    }
);

export default api