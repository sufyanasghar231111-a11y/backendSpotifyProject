import React, { useContext } from 'react'
import { authPlaylist } from '../../contextapi/PlaylistContext'
import { authHome } from '../../contextapi/HomeContext'
import { audioContext } from '../../contextapi/AudioProvider'
import { musciControl } from '../../contextapi/MusicControllerContext'
import { authRecent } from '../../contextapi/RecentRoute'
import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'

const AlbumMain = ({ index, elem, isFav }) => {
    const { setHideAlbumPlaylist, detailData } = useContext(authPlaylist)
    const {  createFav, deletemusic } = useContext(authHome)
    const { playing, currentSong } = useContext(audioContext)
    const { patchMusicPlaying, playRef } = useContext(musciControl)
    const { update } = useContext(authRecent)
    return (
        <div  className='flex  group hover:bg-white/10 transition-all duration-300  py-3 px-2 rounded-lg w-full  gap-6'>

            <div className='relative'>
                <span className=' group-hover:scale-0  scale-100 absolute top-3 transition-all duration-300 '>{index + 1}</span>
                <span onClick={() => {
                    playRef(elem)
                    update(elem._id)
                    patchMusicPlaying(elem._id)
                }} className=' group-hover:scale-100 scale-0  absolute top-3.5 -left-1 transition-all duration-300'>{
                        currentSong === elem._id && playing ? (<RiPauseFill className='text-white cursor-pointer w-5 h-5' />) : (<RiPlayFill onClick={() => {

                        }} className='text-white cursor-pointer w-5 h-5' />)
                    }</span>
            </div>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 h-12  rounded overflow-hidden'>
                        <img className='w-full h-full object-cover' src={elem.image} alt="" />

                    </div>
                    <div>
                        <h1 className='font-semibold'>{elem.title}</h1>
                        <h1 className='text-sm text-white/60 '>{detailData.artist?.username}</h1>
                    </div>
                </div>
                <div className='flex items-center gap-6'>
                    <button onClick={() => { setHideAlbumPlaylist(true) }}>Add To Playlist</button>

                    {
                        isFav ? (<button onClick={() => { deletemusic(elem?._id)
                         }} className={`w-12 h-12 flex items-center justify-center rounded-full  border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
                            <RiHeartFill className='text-red-500 cursor-pointer w-5 h-5' />
                        </button>)
                            :
                            (<button onClick={() => { createFav('music', elem?._id) }} className={`w-12 h-12 flex items-center justify-center rounded-full  border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
                                <RiHeartFill className='text-white cursor-pointer w-5 h-5' />
                            </button>)
                    }
                </div>
            </div>
        </div>
    )
}

export default AlbumMain