import api from "./axios"


export const register = (data) => {
    return api.post('/auth/register', data)
};

export const loginUser = (data) => {
    return api.post('/auth/login', data)
};

export const checkUser = () => {
    return api.get('/auth/user')
};

export const rotation = () => {
    return api.get('/rotation/refresh-token')
}

export const logoutUser = () => {
    return api.get('/rotation/logoutAll')
};

export const updateUserPfp = (formData) => {
    return api.put('/auth/updatepfp',formData)
};

export const deleteUserPfp=()=>{
    return api.delete('auth/removePfp')
};
