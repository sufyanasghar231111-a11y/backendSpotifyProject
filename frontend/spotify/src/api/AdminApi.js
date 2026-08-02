import api from "./axios"

export const montlyActiveUser = (role) =>{
    return api.get(`/active/monthly-active-users-chart?role=${role}`)
}