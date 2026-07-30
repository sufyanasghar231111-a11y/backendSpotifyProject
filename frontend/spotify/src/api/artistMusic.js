import api from "./axios"

export  const updateArtistMusic = (id, formData) => {
    return api.patch(`/creator/update-song/${id}`, formData  )
}