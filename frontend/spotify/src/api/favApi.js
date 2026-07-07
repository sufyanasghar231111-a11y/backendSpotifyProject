import api from "./axios"

export const favGet = () =>{
    return api.get('/user/getUserFavorite')
}

export const createfav = (type, favoriteId) =>{
    return api.patch(`/user/fav/${type}/${favoriteId}`)
}

export const deletefav = (favoriteId) =>{
    return api.delete(`/user/deleteFav/${favoriteId}`)
}

export const getMusic = () =>{
    return api.get(`/current/getcurr`)
}

export const patchMusic = (id,data) =>{
    return api.patch(`/current/patchcurr/${id}`, data)
}

