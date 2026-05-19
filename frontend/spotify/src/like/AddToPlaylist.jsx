import React, { useContext } from 'react'
import { authHome } from '../component/contextapi/HomeContext'
import { authProvider } from '../component/contextapi/AuthContext'

const AddToPlaylist = () => {
    let {getPlayList, hideplaylist, setHidePlaylist}=useContext(authProvider)
    let { patchApi, data, deleteApi } = useContext(authHome)
  return (
    <div>
          {
        hideplaylist && (
          <>
            <div onClick={() => { setHidePlaylist(false) }} className='w-full cursor-pointer h-full inset-0 bg-black/50 backdrop:backdrop-blur-sm  absolute z-14 '></div>
            <div className='absolute top-1/2 left-1/2 z-15 -translate-x-1/2 -translate-y-1/2'>

              <div className='w-72 max-h-80 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e]/95 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200'>

                {/* Header */}
                <div className='sticky top-0 z-10 border-b border-white/10 bg-[#252525] px-4 py-3'>
                  <div className='flex items-center justify-between'>

                    <h1 className='text-lg font-bold text-white'>
                      Your Playlists
                    </h1>
                    <h1 onClick={() => { setHidePlaylist(false) }}>
                      X
                    </h1>
                  </div>
                  <p className='text-xs text-gray-400 mt-1'>
                    Select a playlist
                  </p>
                </div>

                {/* Playlist */}
                <div className='max-h-64 overflow-y-auto p-2 custom-scroll'>

                  {getPlayList.length > 0 ? (
                    getPlayList?.map((elem, index) => {
                      const separateId = elem?.music?.some((song) =>
                        song._id === data._id
                      )

                      return (
                        <>
                          {
                            separateId ? (
                              <div onClick={() => {
                                deleteApi(elem._id, data._id)
                                setHidePlaylist(false)
                              }} key={elem._id} className='group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] cursor-pointer'>

                                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold'>
                                  {index + 1}
                                </div>

                                <h1 className='text-sm font-semibold text-gray-200 group-hover:text-white truncate'>
                                  {separateId && (
                                    <span className="ml-2 text-xs text-green-400">In playlist</span>
                                  )}
                                </h1>

                              </div>
                            ) : (
                              <div onClick={() => {
                                patchApi(elem._id, data._id)
                                setHidePlaylist(false)
                              }} key={elem._id} className='group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/10 hover:scale-[1.02] cursor-pointer'>

                                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold'>
                                  {index + 1}
                                </div>

                                <h1 className='text-sm font-semibold text-gray-200 group-hover:text-white truncate'>
                                  {elem.name}
                                </h1>

                              </div>
                            )
                          }

                        </>
                      )
                    })
                  ) : (
                    <div className='flex flex-col items-center justify-center text-center py-16 px-4'>

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
                  )}
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default AddToPlaylist
