import { RiCamera4Line, RiPencilLine, RiPlayListLine } from '@remixicon/react'
import { RiDiscLine, RiMusic2Line } from "@remixicon/react";
import React, { useContext, useEffect } from 'react'
import { adminContext } from '../contextapi/AdminContext'
import { Link, useParams } from 'react-router-dom'
import { authPlaylist } from '../contextapi/PlaylistContext'
import CheckOwn from '../component/profilepagecomponent/CheckOwn'
import { handlevisibleplaylist } from '../api/playlistApi'
import { useState } from 'react'
import PlaylistInProfile from '../component/profilepagecomponent/PlaylistInProfile'
import NoPublicPlaylistComponent from '../component/profilepagecomponent/NoPublicPlaylistComponent'
import ArtistStatsChart from '../component/profilepagecomponent/ArtistStatsChart';
import OtherUserProfile from '../component/profilepagecomponent/OtherUserProfile';
import { particularAlbumbyUser } from '../api/albumApi';
import { totalSong } from '../api/artistMusic';

const UserProfile = () => {

  const { user } = useContext(adminContext)

  const { visibleParticular, setVisibleParticular, otherArtist, setOtherArtist } = useContext(authPlaylist)
  const [userId, setUserId] = useState([])
  const [totalMusicByArtist, setTotalMusicByArtist] = useState(null)

  const { id } = useParams()
  async function handleVisiblePlaylist() {
    try {
      const res = await handlevisibleplaylist(id)
      setVisibleParticular(res.data.particularVisible)
      setUserId(res.data.user)
    }
    catch (err) {
      console.log(err);
    }
  }

  async function handleOtherArtist() {
    try {
      const res = await particularAlbumbyUser(id)
      setOtherArtist(res.data.myalbum)
    }
    catch (err) {
      console.log(err);
    }
  }

  async function totalMusic() {
    try {
      const res = await totalSong(id)
      setTotalMusicByArtist(res.data.totalSong)
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    if(id){
      totalMusic()
    }
  },[id])

  const profileData = id && id !== user?._id ? userId : user


  useEffect(() => {
    if (id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleVisiblePlaylist()
    }

  }, [id])

  useEffect(() => {
    if (id) {
      handleOtherArtist()
    }
  }, [id])


  const trimname = profileData?.username ?
    ((profileData.username.trim().split(' ')[0][0] + profileData.username.trim().split(' ').pop()[0]).toUpperCase())
    : '';

  const isown = !id || user?._id === profileData?._id

  return (
    <div className='w-full ml-auto rounded-xl overflow-hidden h-[76vh] bg-[#1f1f1f] text-white'>

      {/* HEADER */}
      <div className='w-full flex gap-6 items-center bg-gradient-to-br from-[#4a4a4a] to-[#2b2b2b] sticky top-0 py-5 px-8 shadow-lg'>

        {/* Avatar */}

        <CheckOwn isown={isown} trimname={trimname} profileData={profileData} />

        {/* Info */}
        <div>
          <h1 className='text-sm font-medium text-[#cfcfcf]'>Profile</h1>

          <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight'>
            {profileData?.username}
          </h1>

          <h1 className='pt-2 font-medium text-sm text-[#b5b5b5]'>
            {visibleParticular.length} Playlists
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className='h-[65vh] overflow-y-auto relative bg-[#181818] px-6 py-6 pb-30 left'>
        {
          user?.role === 'user' ? (
            <OtherUserProfile visibleParticular={visibleParticular} isown={isown} />
          ) :
            (
              <ArtistStatsChart otherArtist={otherArtist} totalMusicByArtist={totalMusicByArtist} />
            )
        }
      </div>
    </div>
  )
}

export default UserProfile