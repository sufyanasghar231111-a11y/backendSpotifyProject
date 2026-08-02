import api from "./axios"

export const montlyActiveUser = (config) =>{
    return api.get(`/active/monthly-active-users-chart`, config)
}