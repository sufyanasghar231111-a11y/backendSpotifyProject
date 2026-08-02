import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const { user } = useContext(adminContext)
  if (!user) {
    return <Outlet />
  }

  switch (user.role){
    case 'admin':
      return <Navigate to='/admin' replace />

      case 'artist':
        return <Navigate to='/' replace />

        default :
        return <Navigate to='/' replace />
  }

}

export default PublicRoute