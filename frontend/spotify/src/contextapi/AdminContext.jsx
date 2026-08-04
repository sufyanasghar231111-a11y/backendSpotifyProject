/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { adminCheckRole, montlyActiveUser, songAlbumCount, totalRole, withOutPage } from '../api/AdminApi'
import { resetContext } from './resetPasswordContext'
import { getMusicAlbumPlaylist } from '../api/albumApi'

// eslint-disable-next-line react-refresh/only-export-components
export const adminContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const adminUiContext = createContext()
const AdminContext = ({ children }) => {
    const [getMonthlyActive, setMonthlyActive] = useState([])
    const [user, setUser] = useState(null)
    const { authReady } = useContext(resetContext)
    const [totalUsersData, setTotalUsersData] = useState([])
    const [totalArtistData, setTotalArtistData] = useState([])
    const [totalAdminData, setTotalAdminData] = useState([])
    const [totalRolesData, setTotalRolesData] = useState([])
    const [totalMusic, setTotalMusic] = useState(null)
    const [totalAlbum, setTotalAlbum] = useState(null)
    const [totalPlaylist, setTotalPlaylist] = useState(null)
    const [monthlyDataCount, setMonthlyDataCount] = useState([])
    const [adminNotification, setAdminNotification] = useState(false)
    const [adminProfileModal, setAdminProfileModal] = useState(false)

    const getActiveApi = async () => {
        try {
            const res = await montlyActiveUser({
                params: {
                    role: 'user'
                }
            })
            setMonthlyActive(res.data.chartData)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!authReady || user?.role === 'artist' || user?.role === 'user') return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getActiveApi()
    }, [authReady, user])

    const getUserApi = async () => {
        try {
            const res = await adminCheckRole({
                params: {
                    role: 'user'
                }
            })
            setTotalUsersData(res.data.data)
            
        }
        catch (err) {
            console.log(err);
        }
    }

    const getAdminApi = async () => {
        try {
            const res = await adminCheckRole({
                params: {
                    role: 'admin'
                }
            })
            setTotalAdminData(res.data.data)

        }
        catch (err) {
            console.log(err);
        }
    }

    const getArtistApi = async () => {
        try {
            const res = await adminCheckRole({
                params: {
                    role: 'artist'
                }
            })
            setTotalArtistData(res.data.data)

        }
        catch (err) {
            console.log(err);
        }
    }

    const totalPeople = async () => {
        try {
            const res = await totalRole()
            setTotalRolesData(res.data.getRole)

        }
        catch (err) {
            console.log(err);
        }
    }

    const getSongAlbum = async () =>{
        try{
            const res = await withOutPage()
            setTotalMusic(res.data.music)
            setTotalAlbum(res.data.album)
            setTotalPlaylist(res.data.playlist)
        }
        catch(err){
            console.log(err);
            
        }
    }

    const getSongAlbumCount = async () => {
        try{
            const res = await songAlbumCount()
            setMonthlyDataCount(res.data.chart)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if (!authReady || user?.role !== "admin") return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getUserApi();
        getAdminApi();
        getArtistApi();
        totalPeople();
        getSongAlbum()
        getSongAlbumCount()
        
    }, [authReady, user]);

    return (
        <adminContext.Provider value={{ getMonthlyActive, user, setUser, totalUsersData, totalRolesData, totalArtistData, totalAdminData, totalAlbum,totalMusic, totalPlaylist, monthlyDataCount }}>
            <adminUiContext.Provider value={{adminNotification, setAdminNotification, adminProfileModal, setAdminProfileModal}}>
            {children}
            </adminUiContext.Provider>
        </adminContext.Provider>
    )
}

export default AdminContext