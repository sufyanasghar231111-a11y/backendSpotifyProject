import api from "./axios"


export const getplaylist= () =>{
    return api.get('/user/particularUserPlaylist')
}

export const postplaylist= (name) =>{
    return api.post('/user/playlist', {name})
}

export const patchplaylist= (id,dataId) =>{
    return api.patch(`/user/updateMusic/${id}/${dataId}`)
}

export const deleteplaylist= (id,dataId) =>{
    return api.delete(`/user/deleteMusic/${id}/${dataId}`)
}

export const handlevisibleplaylist = (id) => {
    return api.get(`/user/singleparticularvisible/${id}`)
}

export const fetch = (id) => {
    return api.get(`/creator/singleMusic/${id}`)
}

export const updatePlaylist = (id,formData) =>{
    return api.patch(`/user/updatePlaylistData/${id}`, formData)
}

export const deletePlaylistPfp = (id) => {
    return api.delete(`/user/deletePlaylistData/${id}`)
}