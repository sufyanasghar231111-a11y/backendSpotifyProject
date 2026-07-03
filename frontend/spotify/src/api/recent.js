import api from "./axios"


export const getrecent= () => {
    return api.get('/moreuser/getrecent')
}


export const patchrecent= (id) => {
    return api.patch(`/moreuser/updaterecent/${id}`)
}

export const patchrecentalbum= (id) => {
    return api.patch(`/moreuser/updateRecentAlbum/${id}`)
}

export const deleterecent = (id) => {
    return api.delete(`/moreuser/deleterecent/${id}`)
}

