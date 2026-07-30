import React, { useContext } from 'react'
import { RiPlayListLine } from '@remixicon/react'
import { Link } from 'react-router-dom'
import { authPlaylist } from '../../contextapi/PlaylistContext'

const Playlistget = () => {
    const {  getPlayList } = useContext(authPlaylist)
    
    
  return (
    <div>
       {getPlayList.length > 0 ? (
                    getPlayList?.map((elem, index) => {
                        return <div key={elem?._id} className=' flex items-center px-4 max-sm:px-2 py-2'>
                            <Link to={`/playlist/${elem._id}`} >
                                <div className='flex items-center gap-3'>
                                    <div>
                                        {elem?.playlistPic ? (
                                            <div className='w-13 h-13'>
                                                <img className='w-full h-full object-cover ' src={elem?.playlistPic }  />
                                            </div>
                                        ):
                                        (
                                             <div className='flex items-center justify-center  rounded w-13 max-sm:w-10 max-sm:h-10 h-13 bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] '>
                                        <RiPlayListLine />
                                    </div>
                                        )
                                    }
                                    </div>
                                   
                                    <div className='max-sm:text-sm'>
                                        <h1 className='font-semibold'>{elem.name} </h1>
                                        <h1 className='text-sm max-sm:text-[10px] text-[#a5a5a5] font-semibold'>playlist {index + 1} . <span className={`${elem.music?.length > 0 ? " text-green-500" : "text-red-500"}`}>{elem.music?.length || 0} songs</span></h1>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })
                ) : (
                    <div className=' absolute top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl z-9 font-semibold'>Your playlist library  is empty. Start by creating a playlist.</div>
                )
                }
    </div>
  )
}

export default Playlistget
