import api from "./axios"

export  const postApi = (description) =>{
    return api.post('/request/send-request', description)
}

export const getNotificationData = () =>{
    return api.get('/request/get-notification')
}

export const getRequest = () => {
    return api.get('/request/get-request')
}

export const patchRequest = (id) => {
    return api.post(`/request/patch-request/${id}`)
}

export const deleteRequest = (id) => {
    return api.post(`/request/reject-request/${id}`)
}