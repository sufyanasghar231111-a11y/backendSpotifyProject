import api from "./axios"

export const montlyActiveUser = (config) =>{
    return api.get(`/active/monthly-active-users-chart`, config)
}

export const totalRole = () => {
    return api.get(`/active/get-all-role`)
}

export const adminCheckRole = (config) =>{
    return api.get(`/admin/admin-check-role`,config)
}

export const withOutPage = () => {
    return api.get(`/admin/count-song-album-playlist`);
};

export const songAlbumCount = () =>{
    return api.get('/active/monthly-create-songs-chart')
}