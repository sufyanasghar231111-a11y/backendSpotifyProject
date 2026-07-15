/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { deletePlaylistPfp, updatePlaylist } from '../api/playlistApi';
import { authPlaylist } from './PlaylistContext';

export const playlistUpdate = createContext()
const PlaylistUpdateContext = ({ children }) => {
    const [showUpdate, setShowUpdate] = useState(false);
    const [playlistPfp, setPlaylistPfp] = useState(0)
    const [playlistName, setPlaylistName] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const { setSeparate, separate, handleGetPlayList } = useContext(authPlaylist)
    const [deleteShow, setDeleteShow] = useState(false)


    useEffect(() => {
        if (separate?.name) {
            setPlaylistName(separate?.name)
        }
    }, [separate])

    async function updateDetail(id) {
        try {
            const formData = new FormData()
            formData.append('pfp', playlistPfp)
            formData.append('name', playlistName)

            const res = await updatePlaylist(id, formData)

            setSeparate(prev => ({
                ...prev,
                playlistPic: res.data.updateData?.playlistPic,
                name: res.data.updateData?.name
            }))
            setShowUpdate(false)
            await handleGetPlayList()
        }
        catch (err) {
            console.log(err);
        }
    }

    async function deleteDetail(id) {
        try {
            const res = await deletePlaylistPfp(id)
            setSeparate(prev => ({
                ...prev,
                playlistPic: res.data.deleteImage?.playlistPic
            }))
            
            await handleGetPlayList()
            setImagePreview(null)
            
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <playlistUpdate.Provider value={{ showUpdate, setShowUpdate, updateDetail, playlistName, setPlaylistName, playlistPfp, setPlaylistPfp, imagePreview, setImagePreview, deleteDetail, deleteShow, setDeleteShow }}>
            {children}
        </playlistUpdate.Provider>
    )
}

export default PlaylistUpdateContext