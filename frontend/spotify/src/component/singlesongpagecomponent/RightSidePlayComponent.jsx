import React, { useContext } from 'react'
import { UIPlaylistContext } from '../../contextapi/PlaylistContext'
import { LibraryContext } from '../../contextapi/AuthContext'
import { adminContext } from '../../contextapi/AdminContext'
import { audioContext } from '../../contextapi/AudioProvider'
import { musciControl } from '../../contextapi/MusicControllerContext'
import { authHome } from '../../contextapi/HomeContext'
import { authRecent } from '../../contextapi/RecentRoute'
import { RiAddCircleLine, RiAlbumLine, RiCheckLine, RiDeleteBin6Line, RiHeartFill, RiPauseFill, RiPlayFill, RiPlayListAddLine, RiPlayListLine } from '@remixicon/react'
import { CreateAlbumContext, CreateSongContext } from '../../contextapi/ArtistMusicContext'

const RightSidePlayComponent = ({deleteId, isFav, lib, checkOwn}) => {
     const { createFav, deletemusic, data } = useContext(authHome)
      const { update } = useContext(authRecent)
      const { patchMusicPlaying ,playRef} = useContext(musciControl)
       const { playing,currentSong } = useContext(audioContext)
      const {  addToLibrary, removeTolibrary } = useContext(LibraryContext)
      const {setHidePlaylist}=useContext(UIPlaylistContext)
      const {deleteSong} = useContext(CreateSongContext)
      const {user} = useContext(adminContext)
      const {setAddtoAlbumModal } =useContext(CreateAlbumContext)
 
    return (
        <div className='px-8 py-2 flex flex-col max-sm:w-full  w-[40%] justify-center'>
            <p className='text-sm max-sm:text-[10px] uppercase tracking-[4px] text-gray-400'>
                Now Playing
            </p>
            <h1 className='text-4xl max-sm:text-xl md:text-3xl font-bold mt-3 max-sm:mt-2'>
                {data?.title}
            </h1>
            <p className='text-xl max-sm:text-sm max-sm:mt-0 text-gray-300 mt-3'>{data?.artist?.username || "UnKnown"}</p>

            <button onClick={() => {
                playRef(data)
                patchMusicPlaying(data?._id)
                update(data?._id)
            }} className='w-fit  mt-4  max-sm:mt-2 max-sm:p-2 p-4 flex items-center justify-center  rounded-full bg-green-500 hover:bg-green-400 transition-all duration-300 font-semibold text-black cursor-pointer'>
                {currentSong === data?._id && playing ? (<RiPauseFill className='text-white cursor-pointer w-7 max-sm:w-5 max-sm:h-5 h-7' />) : (<RiPlayFill className='text-white cursor-pointer w-7 max-sm:w-5 max-sm:h-5 h-7' />)
                }
            </button>
            <div className="flex items-center justify-center gap-4 max-sm:gap-3 mt-8 max-sm:mt-3">
                {/* Favorite Button */}
                <div className="relative group">

                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                        Add Favorite
                    </span>

                    {isFav ? (
                        <button
                            onClick={() => deletemusic(deleteId?._id)}
                            className="w-10 max-sm:w-7 max-sm:h-7 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <RiHeartFill className="text-red-500 w-5 h-5 max-sm:w-3 max-sm:h-3" />
                        </button>
                    ) : (
                        <button
                            onClick={() => createFav('music', data?._id)}
                            className="w-10 max-sm:w-7 max-sm:h-7 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <RiHeartFill className="text-white w-5 h-5 max-sm:w-3 max-sm:h-3" />
                        </button>
                    )}
                </div>

                {/* Library Button */}
                <div className="relative group">

                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                        Add Library
                    </span>

                    {lib ? (
                        <button
                            onClick={() => removeTolibrary(data?._id)}
                            className="w-10 max-sm:w-7 max-sm:h-7  h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <RiCheckLine className="text-green-500 w-5 h-5 max-sm:w-3 max-sm:h-3" />
                        </button>
                    ) : (
                        <button
                            onClick={() => addToLibrary(data?._id)}
                            className="w-10 max-sm:w-7 max-sm:h-7 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <RiAddCircleLine className="text-white w-5 h-5 max-sm:w-3 max-sm:h-3" />
                        </button>
                    )}
                </div>

                {/* Playlist Button */}
                <div className="relative group">

                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                        Add Playlist
                    </span>
                    <button
                        onClick={() => setHidePlaylist(true)}
                        className="w-10 max-sm:w-7 max-sm:h-7 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                        <RiPlayListAddLine className="text-white w-5 h-5 max-sm:w-3 max-sm:h-3" />
                    </button>
                </div>
                {
                    user?.role === 'artist' && checkOwn &&  (

                <div onClick={()=>{setAddtoAlbumModal(true)}} className="relative group">

                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                        Add Album
                    </span>
                    <button
                        className="w-10 max-sm:w-7 max-sm:h-7 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                        <RiAlbumLine className="text-white w-5 h-5 max-sm:w-3 max-sm:h-3" />
                    </button>
                </div>
                    )
                }

                {
                    user?.role === 'artist' && checkOwn &&   (
                        <div onClick={()=>{deleteSong(data?._id)}} className="relative group">

                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                        Delete Song
                    </span>
                    <button
                        className="w-10 max-sm:w-7 max-sm:h-7 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                        <RiDeleteBin6Line className="text-white w-5 h-5 max-sm:w-3 max-sm:h-3" />
                    </button>
                </div>
                    )
                }
            </div>
            {/* <div className='mt-3 space-y-4 text-gray-400'>
                <div className='flex justify-between border-b border-white/10 pb-2'>
                    <span>Duration</span>
                </div>
            </div> */}



        </div>
    )
}

export default RightSidePlayComponent