import axios from "axios";
import { getAccessToken } from "./accessToken";

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



export default api