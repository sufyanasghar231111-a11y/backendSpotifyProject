import { RiCamera4Line, RiPencilLine, RiPlayListLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { authProvider } from '../../contextapi/AuthContext'
import { Link } from 'react-router-dom'
import { authPlaylist } from '../../contextapi/PlaylistContext'

const UserProfile = () => {
  let {  user, setHideProfileDetail, setUpdateprofile, setPreview } = useContext(authProvider)
  const {getPlayList,playlistLoader}=useContext(authPlaylist)


  const trimname = (user.username.trim().split(' ')[0][0] + user.username.trim().split(' ').pop()[0]).toUpperCase()

  return (
    <div className='w-full ml-auto rounded-xl overflow-hidden h-[76vh] bg-[#1f1f1f] text-white'>

      {/* HEADER */}
      <div className='w-full flex gap-6 items-center bg-gradient-to-br from-[#4a4a4a] to-[#2b2b2b] sticky top-0 py-5 px-8 shadow-lg'>

        {/* Avatar */}
        <div onClick={() => { setHideProfileDetail(true) }}>

          <div className='shadow-2xl shadow-black group  relative overflow-hidden group text-white   bg-[#2f2f2f] rounded-full w-32 h-32 flex items-center justify-center'>
            <div className=' absolute w-full h-full inset-0  z-45 group-hover:bg-black/50 '></div>
            <div className='absolute flex items-center opacity-0 group-hover:opacity-100 justify-center flex-col z-50'>
              <RiPencilLine className='text-white  w-8 h-8  ' />
              <h1 className='font-semibold text-sm '>Choose photo</h1>
            </div>
            <span className='text-4xl absolute font-bold text-[#aaa]'>{trimname}</span>
            <img src={user.pfp} className='w-full h-full absolute scale-105 z-20 inset-0 object-cover' />
            <input name="profileImage" accept="image/*" onChange={(elem) => {
              let file = elem.target.files[0]
              setUpdateprofile(file)
              if (file) {
                setPreview(URL.createObjectURL(file))
              }
            }} type="file" className='absolute inset-0 z-50  w-full h-full opacity-0 cursor-pointer' />

          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className='text-sm font-medium text-[#cfcfcf]'>Profile</h1>

          <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight'>
            {user.username}
          </h1>

          <h1 className='pt-2 font-medium text-sm text-[#b5b5b5]'>
            {getPlayList.length} Playlists
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className='h-[65vh] overflow-y-auto relative bg-[#181818] px-6 py-6 pb-30'>
        <h1 className='text-xl font-semibold mb-4'>Playlists</h1>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 relative'>
          {
            getPlayList.length > 0 ? (
              getPlayList.map((elem, index) => {
                return (
                  <div
                    key={elem._id}
                    className='bg-[#222] hover:bg-[#2c2c2c] transition-all duration-300 rounded-lg p-3 cursor-pointer shadow-md'
                  >
                    <Link to={`/playlist/${elem._id}?index=${index + 1}`}>
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