import api from "./axios"

export  const updateArtistMusic = (id, formData) => {
    return api.patch(`/creator/update-song/${id}`, formData  )
}

export const deleteThumbnail = (id) => {
    return api.delete(`/creator/thumbnaildelete-song/${id}`)
}