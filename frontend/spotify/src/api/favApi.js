import api from "./axios"

export const favGet = () =>{
    return api.get('/user/getUserFavorite')
}

export const createfav = (favoriteId) =>{
    return api.patch(`/user/fav/${favoriteId}`)
}

export const deletefav = (favoriteId) =>{
    return api.patch(`/user/deleteFav/${favoriteId}`)
}

export const getMusic = () =>{
    return api.get(`/current/getcurr`)
}

export const patchMusic = (id) =>{
    return api.patch(`/current/patchcurr/${id}`)
}

