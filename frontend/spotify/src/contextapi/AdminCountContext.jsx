/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { adminCountRole, totalCountRole } from '../api/AdminApi'
import { adminContext } from './AdminContext'
import { resetContext } from './resetPasswordContext'

export const adminCountContext = createContext()
const AdminCountContext = ({ children }) => {
    const { user } = useContext(adminContext)
    const { authReady } = useContext(resetContext)
    const [totalRole, setTotalRole] = useState(null)
    const [totalUser, setTotalUser] = useState(null)
    const [totalRoleArtist, setTotalRoleArtist] = useState(null)
    const [totalRoleAdmin, setTotalRoleAdmin] = useState(null)
    

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
                params:{role:'user'}
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
                    params:{role:'artist'}
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
                params:{role:'admin'}
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


    return (
        <adminCountContext.Provider value={{ totalRole, totalRoleAdmin, totalRoleArtist, totalUser }}>
            {children}
        </adminCountContext.Provider>
    )
}

export default AdminCountContext