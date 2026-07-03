import api from "./axios"


export const getrecentSearch= () => {
    return api.get('/search/getSearcht')
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
