import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import Home from '../pages/Home'
import DemoPage from '../pages/DemoPage'
import { Navigate, Outlet } from 'react-router-dom'
import Admin from '../pages/adminpage/Admin'
import { resetContext } from '../contextapi/resetPasswordContext'
import LoadingAnimation from '../component/homepagecomponent/LoadingAnimation'

const DemoProtectedRoute = () => {

  const { user } = useContext(adminContext)
  const { authReady } = useContext(resetContext)


  if (!authReady) {
    return <LoadingAnimation />
  }

  if (user === null ) {
    return <DemoPage />
  }

  if (user?.role === "admin") {
    return <Navigate to='/admin' replace />
  }

  

  return <Home />
}

export default DemoProtectedRoute