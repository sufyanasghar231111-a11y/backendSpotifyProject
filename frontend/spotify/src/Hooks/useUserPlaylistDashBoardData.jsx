import { RiDownload2Line, RiLockFill, RiLockLine, RiLockUnlockLine, RiPlayListLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { authSearchBar } from '../contextapi/SearchSeparateContext'
import { adminContext } from '../contextapi/AdminContext'

const useUserPlaylistDashBoardData = () => {
    const { visible } = useContext(authSearchBar)
    const { totalPlaylist } = useContext(adminContext)

    let publicPlaylist = (visible.filter((elem) =>
        elem.visibility === 'public'
    )).length

    let privatePlaylist = (visible.filter((elem) =>
        elem.visibility === 'private'
    )).length
    const now = new Date()
    const newThisMonth= (visible.filter((elem)=>{
        const created = new Date(elem.createdAt)
        return (
            created.getFullYear() === now.getFullYear() &&
            created.getMonth() === now.getMonth()
        )
    })).length

    return [
        {
            id: 1,
            title: "Total Playlists",
            total: totalPlaylist,
            icon: RiPlayListLine,
            color: "text-green-200",
            bg: "bg-green-500"
        },
        {
            id: 2,
            title: "Public Playlist",
            total: publicPlaylist,
            icon: RiLockUnlockLine,
            color: "text-purple-200",
            bg: "bg-purple-500",
        },
        {
            id: 3,
            title: "Private Playlist",
            total: privatePlaylist,
            icon: RiLockFill,
            color: "text-yellow-200",
            bg: "bg-yellow-500",
        },
        {
            id: 4,
            title: "New This Month",
            total: newThisMonth,
            icon: RiDownload2Line,
            color: "text-blue-200",
            bg: "bg-blue-500",
        },
    ]
}

export default useUserPlaylistDashBoardData