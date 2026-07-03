import api from "./axios"


export const getplaylist= () =>{
    return api.get('/user/particularUserPlaylist')
}

export const postplaylist= () =>{
    return api.post('/user/playlist')
}

export const patchplaylist= (id,dataId) =>{
    return api.patch(`/user/updateMusic/${id}/${dataId}`)
}

export const deleteplaylist= (id,dataId) =>{
    return api.delete(`/user/deleteMusic/${id}/${dataId}`)
}