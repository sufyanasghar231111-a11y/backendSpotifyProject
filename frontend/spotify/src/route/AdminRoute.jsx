import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import { Navigate, Outlet } from 'react-router-dom'
import { resetContext } from '../contextapi/resetPasswordContext'
import LoadingAnimation from '../component/homepagecomponent/LoadingAnimation'

const AdminRoute = () => {
    const {user}=useContext(adminContext)
    const { authReady } = useContext(resetContext)
    if(!authReady){
        return <LoadingAnimation />
    }
    
    if(!user) {
        return <Navigate to='/login' replace />
    }

    return user?.role === 'admin' ? <Outlet /> : <Navigate to='/' replace />
}

export default AdminRoute