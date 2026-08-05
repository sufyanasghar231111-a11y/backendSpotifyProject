import { RiAlbumLine, RiDiscLine, RiDownload2Fill, RiTimeLine, RiUserReceivedLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import { authSearchBar } from '../contextapi/SearchSeparateContext'

const useUserAlbumDashData = () => {
    const { totalAlbum } = useContext(adminContext)
    const { album } = useContext(authSearchBar)
    const now = new Date()
    const newThisMonth= (album.filter((elem)=>{
        const created = new Date(elem.createdAt)
        return (
            created.getFullYear() === now.getFullYear() &&
            created.getMonth() === now.getMonth()
        )
    })).length
    return [
        {
            id: 1,
            title: "Total Album",
            total: totalAlbum,
            icon: RiAlbumLine,
            color: "text-green-200",
            bg: "bg-green-500"
        },
        {
            id: 2,
            title: "Published Albums",
            total: totalAlbum,
            icon: RiDiscLine,
            color: "text-purple-200",
            bg: "bg-purple-500",
        },
        {
            id: 3,
            title: "UnPublished Albums",
            total: '0',
            icon: RiTimeLine,
            color: "text-yellow-200",
            bg: "bg-yellow-500",
        },
        {
            id: 4,
            title: "New This Month",
            total: newThisMonth,
            icon: RiDownload2Fill,
            color: "text-blue-200",
            bg: "bg-blue-500",
        },
    ]
}

export default useUserAlbumDashData