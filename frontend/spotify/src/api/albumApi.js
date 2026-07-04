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
    return api.patch(`user/visible/${id}`);
};

