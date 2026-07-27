import React, { useContext } from 'react'
import { authProvider } from '../contextapi/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const {user} = useContext(authProvider)
  return  user ? <Navigate to ='/' replace /> : <Outlet />
}

export default PublicRoute