/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { adminCountRole, totalCountRole, updateadminProfile } from '../api/AdminApi'
import { adminContext } from './AdminContext'
import { resetContext } from './ResetPasswordContext'

export const adminCountContext = createContext()
export const updateProfileContext = createContext()
const AdminCountContext = ({ children }) => {
    const { user, setUser } = useContext(adminContext)
    const { authReady } = useContext(resetContext)
    const [totalRole, setTotalRole] = useState(null)
    const [totalUser, setTotalUser] = useState(null)
    const [totalRoleArtist, setTotalRoleArtist] = useState(null)
    const [totalRoleAdmin, setTotalRoleAdmin] = useState(null)
    const [adminPfp, setAdminPfp] = useState(0)
    const [adminusername, setAdminusername] = useState('')
    const [adminemail, setAdminemail] = useState('')
    const [adminpfppreview, setAdminpfppreview] = useState(null)


    const totalCount = async () => {
        try {
            const res = await totalCountRole()
            setTotalRole(res.data.totalCount)
        }
        catch (err) {
            console.log(err);
        }
    }

    const totalCountUser = async () => {
        try {
            const res = await adminCountRole({
                params: { role: 'user' }
            })
            setTotalUser(res.data.totalCount)
        }
        catch (err) {
            console.log(err);
        }
    }

    const totalCountArtist = async () => {
        try {
            const res = await adminCountRole(
                {
                    params: { role: 'artist' }
                }
            )
            setTotalRoleArtist(res.data.totalCount)
        }
        catch (err) {
            console.log(err);
        }
    }

    const totalCountAdmin = async () => {
        try {
            const res = await adminCountRole({
                params: { role: 'admin' }
            })
            setTotalRoleAdmin(res.data.totalCount)

        }
        catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        if (!authReady || user?.role !== 'admin') return
        totalCount()
        totalCountArtist()
        totalCountAdmin()
        totalCountUser()
    }, [authReady, user])

    const updateProfile = async (e) => {
        e.preventDefault()
        try {
            let formData = new FormData()
            formData.append('pfp', adminPfp)
            formData.append('username', adminusername)
            formData.append('email', adminemail)
            const res = await updateadminProfile(formData)

            setUser(prev => ({
                ...prev,
                pfp: res.data.pfp,
                username: res.data.username,
                email: res.data.email,
            }))

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        if(user?.email){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAdminemail(user.email)
        }
    },[user])

    useEffect(()=>{
        if(user?.username){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAdminusername(user?.username)
        }
    },[user])

    return (
        <adminCountContext.Provider value={{ totalRole, totalRoleAdmin, totalRoleArtist, totalUser }}>
            <updateProfileContext.Provider value={{ updateProfile, adminPfp, setAdminPfp, adminusername, setAdminusername, adminemail, setAdminemail, adminpfppreview, setAdminpfppreview }}>
                {children}
            </updateProfileContext.Provider>
        </adminCountContext.Provider>
    )
}

export default AdminCountContext