import { RiCamera4Line, RiPencilLine, RiPlayListLine } from '@remixicon/react'
import React, { useContext, useEffect } from 'react'
import { authProvider, ProfileContext } from '../../contextapi/AuthContext'
import { Link, useParams } from 'react-router-dom'
import { authPlaylist } from '../../contextapi/PlaylistContext'
import CheckOwn from './CheckOwn'
import { handlevisibleplaylist } from '../../api/playlistApi'
import { useState } from 'react'

const UserProfile = () => {
  
  const { user } = useContext(authProvider)
  
  const { playlistLoader ,visibleParticular,setVisibleParticular} = useContext(authPlaylist)

  const [userId, setUserId]=useState([])

  const { id } = useParams()
  async  function handleVisiblePlaylist(){
      try{
        const res=await handlevisibleplaylist(id)
        setVisibleParticular(res.data.particularVisible)
        setUserId(res.data.user)
      }
      catch(err){
        console.log(err);
      }
    }

    
    

  const profileData=id ? userId : user
  
  
  useEffect(() => {
    if(id){
      handleVisiblePlaylist()
    }

  }, [id])


  const trimname = profileData?.username ?
    ((profileData.username.trim().split(' ')[0][0] + profileData.username.trim().split(' ').pop()[0]).toUpperCase())
    : '';

    const isown=!id || user?._id === profileData?._id

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
      <div className='h-[65vh] overflow-y-auto relative bg-[#181818] px-6 py-6 pb-30'>
        <h1 className='text-xl font-semibold mb-4'>Playlists</h1>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 relative'>
          {
            visibleParticular.length > 0 ? (
              visibleParticular.map((elem) => {
                return (
                  <div
                    key={elem._id}
                    className='bg-[#222] hover:bg-[#2c2c2c] transition-all duration-300 rounded-lg p-3 cursor-pointer shadow-md'
                  >
                    <Link to={`/visible/${elem._id}`}>
                      <div className='w-full flex items-center justify-center h-40 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] rounded-md mb-3' >
                        <RiPlayListLine className='text-white w-20 h-20' />
                      </div>
                      <h1 className='text-base font-semibold truncate'>
                        {elem.name}
                      </h1>

                      <h1 className='text-sm text-[#a9a9a9]'>
                        {elem.user.username}
                      </h1>
                    </Link>
                  </div>
                )
              })
            ) : (
              <>
              {
                isown? (
                   <div className='flex flex-col items-center  top-25 left-1/2  -translate-x-1/2 -translate-y-1/2 absolute justify-center text-center py-10 px-4'>

                <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl'>
                  🎵
                </div>

                <h1 className='text-white font-semibold text-lg'>
                  No playlists yet
                </h1>

                <p className='text-sm text-gray-400 mt-2 leading-5'>
                  Your playlist library is empty.
                  <br />
                  Start by creating a playlist.
                </p>
              </div>
                ):(
                   <div className='flex flex-col items-center  top-25 left-1/2  -translate-x-1/2 -translate-y-1/2 absolute justify-center text-center py-10 px-4'>

                <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl'>
                  🎵
                </div>

                <h1 className='text-white font-semibold text-lg'>
                  No public playlists yet
                </h1>

                <p className='text-sm text-gray-400 mt-2 leading-5'>
                 This user hasn't created any public playlists yet.
                </p>
              </div>
                )
              }
             
              </>
            )
          }


        </div>
        {
          playlistLoader && (
            <div className='absolute inset-0  z-20 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#1f1f1f]/95 to-[#0f0f0f]/95 backdrop-blur-3xl'>
              <div className='w-12 h-12 border-4 border-white/20 border-t-green-500 rounded-full animate-spin'></div>
              <p className='text-white text-lg font-medium tracking-wide animate-pulse'>
                Loading Playlist...
              </p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default UserProfile