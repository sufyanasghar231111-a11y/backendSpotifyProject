import axios from "axios";
import { getAccessToken } from "./accessToken";

const api=axios.create({
    baseURL:'http://localhost:3000/api',
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