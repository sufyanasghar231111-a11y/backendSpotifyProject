import api from "./axios"

export const montlyActiveUser = (config) =>{
    return api.get(`/active/monthly-active-users-chart`, config)
}

export const totalRole = () => {
    return api.get(`/active/get-all-role`)
}

export const adminCheckRole = (config, adminPage) =>{
    return api.get(`/admin/admin-check-role?page=${adminPage}`,config)
}

export const adminCountRole = (config) =>{
    return api.get(`/admin/count-role`,config)
}
export const totalCountRole = () =>{
    return api.get(`/admin/count-role`)
}

export const withOutPage = () => {
    return api.get(`/admin/count-song-album-playlist`);
};

export const songAlbumCount = () =>{
    return api.get('/active/monthly-create-songs-chart')
}

export const blockRoles = (id) => {
    return api.patch(`/admin/blockartist/${id}`)
}
export const unblockRoles = (id) => {
    return api.patch(`/admin/unblock/${id}`)
}