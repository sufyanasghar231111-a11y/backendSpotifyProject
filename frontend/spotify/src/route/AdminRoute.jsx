import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
    const {user}=useContext(adminContext)
    if(!user) {
        return <Navigate to='/login' replace />
    }

    return user?.role === 'admin' ? <Outlet /> : <Navigate to='/' replace />
}

export default AdminRoute