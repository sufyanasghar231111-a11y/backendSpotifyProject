import { RiAlbumLine, RiGroupLine, RiMicLine, RiMusic2Line, RiPlayList2Line, RiUser3Line, RiUserAddLine, RiUserFollowLine, RiUserForbidLine, RiUserReceivedLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { adminCountContext } from '../contextapi/AdminCountContext'
import { adminContext } from '../contextapi/AdminContext'

const useUserDashBoardData = () => {
   const {  totalUser } = useContext(adminCountContext)
   const { totalUsersData} = useContext(adminContext)
   const totalActive = (totalUsersData.filter(elem => elem.isOnline)).length
         
  return  [
    {
      id: 1,
      title: "Total Users",
      total: totalUser,
      icon: RiGroupLine,
      color: "text-green-200",
      bg: "bg-green-500"
    },
    {
      id: 2,
      title: "Active Users",
      total: totalActive,
      icon: RiUserFollowLine,
      color: "text-purple-200",
      bg: "bg-purple-500",
    },
    {
      id: 3,
      title: "Banned Users",
      total: '10',
      icon: RiUserForbidLine,
      color: "text-yellow-200",
      bg: "bg-yellow-500",
    },
    {
      id: 4,
      title: "New This Month",
      total: '10',
      icon: RiUserReceivedLine,
      color: "text-blue-200",
      bg: "bg-blue-500",
    },
  ]
}

export default useUserDashBoardData