import {
  RiUser3Line,
  RiMicLine,
  RiMusic2Line,
  RiAlbumLine,
  RiPlayList2Line,
} from "@remixicon/react";
import React, { useContext } from 'react'
import { adminContext } from "../contextapi/AdminContext";
import { adminCountContext } from "../contextapi/AdminCountContext";

const DashBoardData = () => {
  const { totalUsersData, totalArtistData ,totalAlbum,totalMusic, totalPlaylist} = useContext(adminContext)
  const {  totalRoleArtist, totalUser } = useContext(adminCountContext)
  const onlineArtist = (totalArtistData.filter(elem => elem.isOnline )).length
  const onlineUser = (totalUsersData.filter(elem => elem.isOnline )).length
  

  return [
    {
      id: 1,
      title: "Total Users",
      total: totalUser,
      icon: RiUser3Line,
      color: "text-green-200",
      bg: "bg-green-500",
      isOnline : onlineUser
    },
    {
      id: 2,
      title: "Artists",
      total: totalRoleArtist,
      icon: RiMicLine,
      color: "text-purple-200",
      bg: "bg-purple-500",
      isOnline : onlineArtist
    },
    {
      id: 3,
      title: "Songs",
      total: totalMusic,
      icon: RiMusic2Line,
      color: "text-sky-200",
      bg: "bg-sky-500",
    },
    {
      id: 4,
      title: "Albums",
      total: totalAlbum,
      icon: RiAlbumLine,
      color: "text-yellow-200",
      bg: "bg-yellow-500",
    },
    {
      id: 5,
      title: "Playlists",
      total: totalPlaylist,
      icon: RiPlayList2Line,
      color: "text-pink-200",
      bg: "bg-pink-500",
    },
  ]
}

export default DashBoardData