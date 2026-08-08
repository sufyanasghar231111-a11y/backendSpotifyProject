import React, { useContext } from 'react'
import { authPlaylist } from '../../contextapi/PlaylistContext'
import PlaylistInProfile from './PlaylistInProfile'
import NoPublicPlaylistComponent from './NoPublicPlaylistComponent'

const OtherUserProfile = ({visibleParticular, isown}) => {
    const {playlistLoader} = useContext(authPlaylist)
  return (
    <>
              <h1 className='text-xl font-semibold mb-4'>Playlists</h1>
              <div className='grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-5 relative'>
                {
                  visibleParticular?.length > 0 ? (
                    visibleParticular.map((elem) => {
                      return (
                        <PlaylistInProfile elem={elem} />
                      )
                    })
                  ) : (
                    <>
                      {
                        isown ? (
                          <NoPublicPlaylistComponent />
                        ) : (
                          <div className='flex flex-col items-center  top-25 left-1/2  -translate-x-1/2 -translate-y-1/2 absolute justify-center text-center py-10 px-4'>

                            <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl'>
                              🎵
                            </div>

                            <h1 className='text-white font-semibold text-lg max-sm:text-sm'>
                              No public playlists yet
                            </h1>

                            <p className='text-sm text-gray-400 mt-2 max-sm:text-xs leading-5'>
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
            </>
  )
}

export default OtherUserProfile
