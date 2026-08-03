import React, { useContext } from 'react'
import Login from '../Login'
import { LogoutContext } from '../../contextapi/AuthContext'
import AdminNav from '../../component/adminPageComponent/dashBoardpageComponent/AdminNav'
import DashBoardLeft from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardLeft'
import DashBoardRight from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardRight'
import { Outlet, useLocation } from 'react-router-dom'

function Admin() {
  const {handleLogout} = useContext(LogoutContext)
  let location = useLocation()
  return (
    <div className='text-white '>
      <button onClick={handleLogout}>hello</button>
      <AdminNav />
      <div className='flex  justify-start  pt-16 '>
        <DashBoardLeft />
        <Outlet />
        {
          location.pathname === '/admin' && (<DashBoardRight />)
        }
        
      </div>
    </div>
  )
}

export default Admin