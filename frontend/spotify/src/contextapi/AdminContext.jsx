/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { adminCheckRole, blockRoles, montlyActiveUser, songAlbumCount, totalRole, unblockRoles, withOutPage } from '../api/AdminApi'
import { resetContext } from './ResetPasswordContext'
import { getMusicAlbumPlaylist } from '../api/albumApi'
import { create } from 'axios'

// eslint-disable-next-line react-refresh/only-export-components
export const adminContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const adminUiContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const bannedUserContext = createContext()
const AdminContext = ({ children }) => {
    const [getMonthlyActive, setMonthlyActive] = useState([])
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState([])
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
    const [adminPage, setAdminPage] = useState(1)
    

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
        if (!authReady || user?.role !== 'admin') return
        getActiveApi()
    }, [authReady, user?.role])

    const getUserApi = async () => {
        try {
            const res = await adminCheckRole({
                params: {
                    role: 'user',
                    page:adminPage
                }
            },
                
            )
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
                    role: 'admin',
                    page:adminPage
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
                    role: 'artist',
                    page:adminPage
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

    const getSongAlbum = async () => {
        try {
            const res = await withOutPage()
            setTotalMusic(res.data.music)
            setTotalAlbum(res.data.album)
            setTotalPlaylist(res.data.playlist)
        }
        catch (err) {
            console.log(err);

        }
    }

    const getSongAlbumCount = async () => {
        try {
            const res = await songAlbumCount()
            setMonthlyDataCount(res.data.chart)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!authReady || user?.role !== "admin") return;
        getUserApi();
        getAdminApi();
        getArtistApi()
    }, [authReady, user?.role, adminPage]);

    const blockRole = async (id) =>{
        try{
            const res = await blockRoles(id)
            await getArtistApi()
            await getUserApi()
        }
        catch(err){
            console.log(err);
        }
    } 
    const unblockRole = async (id) =>{
        try{
            const res = await unblockRoles(id)
            await getArtistApi()
            await getUserApi()
        }
        catch(err){
            console.log(err);
        }
    } 


    useEffect(() => {
        if (!authReady || user?.role !== "admin") return;
        totalPeople();
        
        getSongAlbumCount()
    }, [authReady, user?.role]);

    useEffect(()=>{
        if(!authReady || !user) return
         getSongAlbum()
    },[authReady, user])

    return (
        <adminContext.Provider value={{ getMonthlyActive, user, setUser, totalUsersData, totalRolesData, totalArtistData, totalAdminData, totalAlbum, totalMusic, totalPlaylist, monthlyDataCount, getArtistApi, userId, setUserId }}>
            <adminUiContext.Provider value={{ adminNotification, setAdminNotification, adminProfileModal, setAdminProfileModal, adminPage, setAdminPage }}>
                <bannedUserContext.Provider value={{blockRole, unblockRole }}>
                {children}
                </bannedUserContext.Provider>
            </adminUiContext.Provider>
        </adminContext.Provider>
    )
}

export default AdminContext