import api from "./axios"


export const getrecentSearch= () => {
    return api.get('/search/getSearch')
}


export const patchrecentSearch= (id) => {
    return api.patch(`/search/playlistSearch/${id}`)
}

export const patchrecentalbumSearch= (id) => {
    return api.patch(`/search/albumSearch/${id}`)
}

export const deleterecentSearch = (id) => {
    return api.delete(`/search/deleteSearch/${id}`)
}

export const singlevisible = (id) => {
    return api.get(`/user/separate/${id}`)
}

export const handleSingle = (id) => {
    return api.get(`/creator/singlevisible/${id}`)
}

export const songsearch = (id) => {
    return api.patch(`/search/songSearch/${id}`)
}

