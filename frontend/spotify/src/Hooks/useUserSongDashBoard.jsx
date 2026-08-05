import React from 'react'
import { RiAlbumLine, RiDownload2Fill, RiDownloadFill, RiMusicLine, RiTimeLine, } from '@remixicon/react'
const useUserSongDashBoard = () => {
    return [
        {
            id: 1,
            title: "Total Songs",
            total: '10',
            icon: RiMusicLine,
            color: "text-green-200",
            bg: "bg-green-500"
        },
        {
            id: 2,
            title: "Published Songs",
            total: '10',
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
            total: '10',
            icon: RiDownload2Fill,
            color: "text-blue-200",
            bg: "bg-blue-500",
        },
    ]
}

export default useUserSongDashBoard