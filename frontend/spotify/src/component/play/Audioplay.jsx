import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authHome } from '../../contextapi/HomeContext'
import axios from 'axios'
import { authRecent } from '../../contextapi/RecentRoute'
import { musciControl } from "../../contextapi/MusicControllerContext";
import { audioContext } from "../../contextapi/AudioProvider";
import { RiAddCircleLine, RiCheckLine, RiHeartFill, RiPauseFill, RiPlayFill, RiPlayListAddLine, RiPlayListLine } from '@remixicon/react'
import {  LibraryContext } from '../../contextapi/AuthContext'
import {  UIPlaylistContext } from '../../contextapi/PlaylistContext'

const Audioplay = () => {
  let { id } = useParams()
  let { createFav, deletemusic, fav, data, setData } = useContext(authHome)
  let { update } = useContext(authRecent)
  let { patchMusicPlaying ,playRef} = useContext(musciControl)
   let { playing,currentSong } = useContext(audioContext)

  let {  addToLibrary, removeTolibrary, library } = useContext(LibraryContext)

  const {setHidePlaylist}=useContext(UIPlaylistContext)

  async function fetchSingleMusic() {
    try {
      const res = await axios.get(`http://localhost:3000/api/creator/singleMusic/${id}`)
      setData(res.data.detail)
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {

    fetchSingleMusic()
  }, [])


  const isFav = fav.some(user =>
    user.favorite.some(song => song._id === data?._id)
  )

  const lib = library.some(user =>
    user.music.some(song => song._id === data?._id)
  )
  
  return (
    <>
      <div className='relative  h-[70vh] w-[60%] '>

        <div className='w-full h-full'>
          <img
            src={data?.image}
            className='w-full h-full object-cover'
          />

        </div>
      
        <div className='absolute inset-0 bg-black/30'></div>
      </div>

      <div className='px-8 py-2 flex flex-col w-[40%] justify-center'>
        <p className='text-sm uppercase tracking-[4px] text-gray-400'>
          Now Playing
        </p>
        <h1 className='text-4xl md:text-5xl font-bold mt-3'>
          {data?.title}
        </h1>
        <p className='text-xl text-gray-300 mt-3'>{data?.artist?.username}</p>

        <button onClick={() => { playRef(data)
            patchMusicPlaying(data?._id)
            update(data?._id) }} className='w-fit px-4 mt-4  py-4 flex items-center justify-center  rounded-full bg-green-500 hover:bg-green-400 transition-all duration-300 font-semibold text-black cursor-pointer'>
          {currentSong === data?._id && playing ? (<RiPauseFill  className='text-white cursor-pointer w-7 h-7' />) : (<RiPlayFill  className='text-white cursor-pointer w-7 h-7' />)
          }
        </button>
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Favorite Button */}
          <div className="relative group">
            
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              Add Favorite
            </span>

            {isFav ? (
              <button
                onClick={() => deletemusic(data?._id)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <RiHeartFill className="text-red-500 w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => createFav(data?._id)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <RiHeartFill className="text-white w-5 h-5" />
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
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <RiCheckLine className="text-green-500 w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => addToLibrary(data?._id)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <RiAddCircleLine className="text-white w-5 h-5" />
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
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
            >
            <RiPlayListAddLine className="text-white w-5 h-5" />
          </button>
            </div>
        </div>
        <div className='mt-3 space-y-4 text-gray-400'>
          <div className='flex justify-between border-b border-white/10 pb-2'>
            <span>Duration</span>
            {/* <span>{Math.floor((duration[data._id] || 0) / 60)}: {String(Math.floor((duration[data._id] || 0)) % 60).padStart(2, '0')}</span> */}
          </div>
        </div>
        
        

      </div>
    </>
  )
}


export default Audioplay



