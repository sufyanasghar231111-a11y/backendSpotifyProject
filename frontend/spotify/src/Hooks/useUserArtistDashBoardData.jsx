import { RiGroupLine, RiMusicLine, RiTimeLine, RiUserFollowLine, RiUserForbidLine, RiUserLine, RiUserReceivedLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { adminCountContext } from '../contextapi/AdminCountContext'
import { adminContext } from '../contextapi/AdminContext'
import { requestContext } from '../contextapi/UserRequest'

const useUserArtistDashBoardData = () => {
    const { totalRoleArtist } = useContext(adminCountContext)
    const { getRequests } = useContext(requestContext)
    const { totalArtistData } = useContext(adminContext)
    const totalActive = (totalArtistData.filter(elem => elem.isOnline)).length
    const totalRequest = (getRequests.filter(elem => elem.requestStatus === 'Pending')).length
    const now = new Date()
    const newThisMonth = (totalArtistData.filter((elem) => {
        const created = new Date(elem.artistApprovedAt)
        return (
            created.getFullYear() === now.getFullYear() &&
            created.getMonth() === now.getMonth()
        )
    })).length

    return [
        {
            id: 1,
            title: "Total Artists",
            total: totalRoleArtist,
            icon: RiGroupLine,
            color: "text-green-200",
            bg: "bg-green-500"
        },
        {
            id: 2,
            title: "Active Artists",
            total: totalActive,
            icon: RiUserLine,
            color: "text-purple-200",
            bg: "bg-purple-500",
        },
        {
            id: 3,
            title: "Pending Requests",
            total: totalRequest,
            icon: RiTimeLine,
            color: "text-yellow-200",
            bg: "bg-yellow-500",
        },
        {
            id: 4,
            title: "New This Month",
            total: newThisMonth,
            icon: RiMusicLine,
            color: "text-blue-200",
            bg: "bg-blue-500",
        },
    ]
}

export default useUserArtistDashBoardData