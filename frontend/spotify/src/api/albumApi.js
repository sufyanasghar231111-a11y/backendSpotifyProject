import api from "./axios";

export const getMusicAlbumPlaylist = (page, search= "") => {
    return api.get(
        `/creator/getmusicalbum?page=${page}&search=${search}`
    );
};

export const separateGet = (page) => {
    return api.get(
        `/creator/getmusicalbum?page=${page}`
    );
};


export const patchtext = (text) => {
    return api.patch('/search/recenttext', text);
};

export const updatevisibility = (id) => {
    return api.patch(`/user/visible/${id}`);
};

export const albumArtist = (id, formData) => {
    return api.patch(`/creator/update-album/${id}`, formData)
}

export const deleteAlbumThumbNail = (id) => {
    return api.delete(`/creator/albumpic-delete/${id}`)
}

export const createAlbum = (title) =>{
    return api.post(`/creator/album`, title)
}

export const addSong = (albumId, songId) => {
    return api.patch(`/creator/add-song/${albumId}/${songId}`)
}

export const deleteToSong = (albumId, songId) => {
    return api.delete(`/creator/deleteMusic/${albumId}/${songId}`)
}

export const particularAlbum = () => {
    return api.get(`/creator/particularAlbum`)
}