import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
    const {user}=useContext(adminContext)

    return user.role === 'admin' ? <Outlet /> : <Navigate to='/login' replace />
}

export default AdminRoute