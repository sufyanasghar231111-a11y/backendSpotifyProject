import React, { useContext } from 'react'
import { authPlaylist, UIPlaylistContext } from '../contextapi/PlaylistContext'

const CreatePlaylist = () => {
      const { handleCreatePlaylist, name, setName } = useContext(authPlaylist)
      const { hideplay, setHidePlay}=useContext(UIPlaylistContext)
  return (
    <div>
      {
        hideplay && (
          <>
            <div onClick={() => { setHidePlay(false) }} className='inset-0 cursor-pointer absolute bg-black/50 backdrop:backdrop-blur-sm z-160'></div>
            <div className='flex top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 items-center justify-center  absolute z-162'>
              <div className=' lg:w-70 max-sm:w-55  w-65 md:w-65 rounded-lg bg-[#282828] flex items-center text-center  pt-5 px-4 flex-col'>
                <h1 className='font-extrabold text-3xl max-sm:text-xl mb-4'>Your Music, <br /> Your Playlist </h1>
                <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Enter your title' className='mt-6 max-sm:mt-3 border border-[#797777] text-sm py-2 max-sm:py-1.5 max-sm:text-xs px-4 rounded-full w-full ' />
                <div className='py-3  flex w-full  justify-end gap-2 text-sm font-semibold pt-8 '>
                  <button onClick={handleCreatePlaylist} className='border border-[#797777] cursor-pointer rounded-full px-3  py-1 bg-white/5 max-sm:text-xs'>Create</button>
                  <button onClick={() => { setHidePlay(false) }} className='border border-[#797777] cursor-pointer rounded-full px-3 py-1 bg-white/10 max-sm:text-xs'>Cancel</button>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default React.memo(CreatePlaylist)
