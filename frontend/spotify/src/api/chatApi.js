import api from "./axios"

export const conversationApi = (userid) =>{
    return api.post(`/conversations/${userid}`)
}

export const messageApi = (conversationId, data) => {
    return api.post(`/message/create-message/${conversationId}`, data)
}

export const getAllChatApi = (conversationId) => {
    return api.get(`/message/get-message/${conversationId}`)
}