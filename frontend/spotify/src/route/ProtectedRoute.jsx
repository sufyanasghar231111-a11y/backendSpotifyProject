import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import { Navigate, Outlet } from 'react-router-dom'
import { resetContext } from '../contextapi/ResetPasswordContext'
import LoadingAnimation from '../component/homepagecomponent/LoadingAnimation'

const ProtectedRoute = () => {
    const { user } = useContext(adminContext)
    const { authReady} = useContext(resetContext)

    if(!authReady){
        return <LoadingAnimation />
    }

    if (user === null) {
        return <Navigate to='/' replace />
    }

    if (user?.role === 'admin') {
        return <Navigate to='/admin' replace />
    }

    return <Outlet />
}

export default ProtectedRoute
