/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { adminCheckRole, montlyActiveUser, totalRole } from '../api/AdminApi'
import { resetContext } from './resetPasswordContext'

// eslint-disable-next-line react-refresh/only-export-components
export const adminContext = createContext()
const AdminContext = ({ children }) => {
    const [getMonthlyActive, setMonthlyActive] = useState([])
    const [user, setUser] = useState(null)
    const { authReady } = useContext(resetContext)
    const [totalUsers, setTotalUsers] = useState([])
    const [totalArtist, setTotalArtist] = useState([])
    const [totalAdmin, setTotalAdmin] = useState([])
    const [totalRoles, setTotalRoles] = useState([])

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
        if (!authReady || user.role === 'artist' || user.role === 'user') return
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
            setTotalUsers(res.data.data)
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
            setTotalAdmin(res.data.data)

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
            setTotalArtist(res.data.data)

        }
        catch (err) {
            console.log(err);
        }
    }

    const totalPeople = async () => {
        try {
            const res = await totalRole()
            setTotalRoles(res.data.getRole)

        }
        catch (err) {
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
    }, [authReady, user]);

    return (
        <adminContext.Provider value={{ getMonthlyActive, user, setUser, totalUsers, totalRoles, totalArtist, totalAdmin }}>
            {children}
        </adminContext.Provider>
    )
}

export default AdminContext