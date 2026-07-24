import api from "./axios"

export  const postApi = (description) =>{
    return api.post('/request/send-request', description)
}