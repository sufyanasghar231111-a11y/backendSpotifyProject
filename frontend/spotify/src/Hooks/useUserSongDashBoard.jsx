import React, { useContext } from 'react'
import { RiAlbumLine, RiDownload2Fill, RiDownloadFill, RiMusicLine, RiTimeLine, } from '@remixicon/react'
import { adminContext } from '../contextapi/AdminContext'
import { authSearchBar } from '../contextapi/SearchSeparateContext'
const useUserSongDashBoard = () => {
    const { totalMusic } = useContext(adminContext)
        const { music } = useContext(authSearchBar)
        const now = new Date()
        const newThisMonth= (music.filter((elem)=>{
            const created = new Date(elem.createdAt)
            return (
                created.getFullYear() === now.getFullYear() &&
                created.getMonth() === now.getMonth()
            )
        })).length
    return [
        {
            id: 1,
            title: "Total Songs",
            total: totalMusic,
            icon: RiMusicLine,
            color: "text-green-200",
            bg: "bg-green-500"
        },
        {
            id: 2,
            title: "Published Songs",
            total: totalMusic,
            icon: RiMusicLine,
            color: "text-purple-200",
            bg: "bg-purple-500",
        },
        {
            id: 3,
            title: "UnPublished Songs",
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

export default useUserSongDashBoard