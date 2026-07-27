import axios from "axios";
import { getAccessToken } from "./accessToken";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api=axios.create({
    baseURL: API_BASE_URL,
    withCredentials:true
});

api.interceptors.request.use((config)=>{
    let token = getAccessToken()
    if(token) {
    config.headers.Authorization = `Bearer ${token}`
    }
    

    return config
})

export default api