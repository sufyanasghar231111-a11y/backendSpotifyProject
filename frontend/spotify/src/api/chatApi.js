import api from "./axios"

export const conversationApi = (data) =>{
    return api.post(`/conversations`, data)
}

export const messageApi = (conversationId, data) => {
    return api.post(`/message/create-message/${conversationId}`, data)
}