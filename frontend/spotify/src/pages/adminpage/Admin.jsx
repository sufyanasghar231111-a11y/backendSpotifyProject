import React, { useContext, useEffect } from 'react'
import Login from '../Login'
import { LogoutContext } from '../../contextapi/AuthContext'
import AdminNav from '../../component/adminPageComponent/dashBoardpageComponent/AdminNav'
import DashBoardLeft from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardLeft'
import DashBoardRight from '../../component/adminPageComponent/dashBoardpageComponent/DashBoardRight'
import { Outlet, useLocation } from 'react-router-dom'
import SureForLogOut from '../../modals/SureForLogOut'
import { adminUiContext } from '../../contextapi/AdminContext'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'
import SingleRequestModal from '../../modals/adminmodal/SingleRequestModal'
import { requestContext } from '../../contextapi/UserRequest'
import { UIHomeContex } from '../../contextapi/HomeContext'

function Admin() {
  const { setAdminPage } = useContext(adminUiContext)
  const { setPage } = useContext(authSearchBar)
  const { getRequests } = useContext(requestContext)
  const { setHide , hide } = useContext(UIHomeContex)
  const totalUnread = (getRequests.filter(elem => !elem.isChecked)).length
  let location = useLocation()
  useEffect(() => {
    setAdminPage(1)
    setPage(1)
    window.scrollTo({
      top: 0,
    });
  }, [location.pathname, setAdminPage, setPage])
  return (
    <div className='text-white w-full  bg-[#121212]'>
      <SureForLogOut />
      <SingleRequestModal />
      <AdminNav />
      <div className='flex  justify-start  pt-16 '>

            <DashBoardLeft totalUnread={totalUnread} hide={hide} setHide={setHide} />
          
        <Outlet />
        {
          location.pathname === '/admin' && (<DashBoardRight />)
        }

      </div>
    </div>
  )
}

export default Admin