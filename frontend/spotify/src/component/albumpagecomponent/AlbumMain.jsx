import React, { useContext } from 'react'
import { authPlaylist, UIPlaylistContext } from '../../contextapi/PlaylistContext'
import { authHome } from '../../contextapi/HomeContext'
import { audioContext } from '../../contextapi/AudioProvider'
import { musciControl } from '../../contextapi/MusicControllerContext'
import { authRecent } from '../../contextapi/RecentRoute'
import { RiHeartFill, RiMusicLine, RiPauseFill, RiPlayFill, RiPlayList2Fill } from '@remixicon/react'

const AlbumMain = ({ index, elem, isFav }) => {
    const {  detailData, setHidePlaylist } = useContext(UIPlaylistContext)
    const {  createFav, deletemusic } = useContext(authHome)
    const { playing, currentSong } = useContext(audioContext)
    const { patchMusicPlaying, playRef } = useContext(musciControl)
    const { update } = useContext(authRecent)
    return (
        <div  className='flex  group hover:bg-white/10 max-sm:bg-white/10 transition-all duration-300  py-3 px-2 rounded-lg w-full  gap-6'>

            <div className='relative'>
                <span className=' group-hover:scale-0 max-sm:scale-0  scale-100 absolute top-3 transition-all duration-300 '>{index + 1}</span>
                <span onClick={() => {
                    playRef(elem)
                    update(elem._id)
                    patchMusicPlaying(elem._id)
                }} className=' group-hover:scale-100 scale-0  max-sm:scale-100 absolute top-3.5  -left-1 transition-all duration-300'>{
                        currentSong === elem._id && playing ? (<RiPauseFill className='text-white cursor-pointer w-5 h-5' />) : (<RiPlayFill onClick={() => {

                        }} className='text-white cursor-pointer w-5 h-5' />)
                    }</span>
            </div>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-3'>
                    <div className='w-12 max-sm:w-10 max-sm:h-10 h-12  rounded relative overflow-hidden'>
                        <div className=' z-39 absolute bg-green-500 w-full h-full flex items-center justify-center'>
                            <RiMusicLine />
                        </div>
                        {elem.image && (
                            <img className='w-full h-full object-cover absolute z-40'  src={elem.image} alt="" />
                        )}

                    </div>
                    <div>
                        <h1 className='font-semibold max-sm:text-xs'>{elem.title}</h1>
                        <h1 className='text-sm text-white/60 max-sm:text-[10px]'>{detailData?.artist?.username || 'UnKnown Title'}</h1>
                    </div>
                </div>
                <div className='flex items-center gap-6 max-sm:gap-2'>
                    <button className='' onClick={() => { setHidePlaylist(true) }}><RiPlayList2Fill className='w-5 h-5' /></button>

                    {
                        isFav ? (<button onClick={() => { deletemusic(elem?._id)
                         }} className={`w-12 max-sm:w-8 max-sm:h-8 h-12 flex items-center justify-center rounded-full  border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
                            <RiHeartFill className='text-red-500 cursor-pointer w-5 max-sm:w-3 max-sm:h-3 h-5' />
                        </button>)
                            :
                            (<button onClick={() => { createFav('music', elem?._id) }} className={`w-12 max-sm:w-8 max-sm:h-8 h-12 flex items-center justify-center rounded-full  border border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer`}>
                                <RiHeartFill className='text-white cursor-pointer w-5 max-sm:w-3 max-sm:h-3 h-5' />
                            </button>)
                    }
                </div>
            </div>
        </div>
    )
}

export default AlbumMain