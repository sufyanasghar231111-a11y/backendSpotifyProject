import React, { useContext } from 'react'
import { authProvider } from '../component/contextapi/AuthContext'

const CreatePlaylist = () => {
      let { hideplay, setHidePlay, handleCreatePlaylist, name, setName } = useContext(authProvider)
  return (
    <div>
      {
        hideplay && (
          <>
            <div onClick={() => { setHidePlay(false) }} className='inset-0 cursor-pointer absolute bg-black/50 backdrop:backdrop-blur-sm z-10'></div>
            <div className='flex top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 items-center justify-center  absolute z-12'>
              <div className=' w-70  rounded-lg bg-[#353434] flex items-center text-center  pt-5 px-4 flex-col'>
                <h1 className='font-extrabold text-3xl mb-4'>Your Music, <br /> Your Playlist </h1>
                <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Enter your title' className='mt-6 border border-[#797777] text-sm py-2 px-4 rounded-full w-full ' />
                <div className='py-3  flex w-full  justify-end gap-2 text-sm font-semibold pt-8 '>
                  <button onClick={handleCreatePlaylist} className='border border-[#797777] cursor-pointer rounded-full px-3 py-1'>Create</button>
                  <button onClick={() => { setHidePlay(false) }} className='border border-[#797777] cursor-pointer rounded-full px-3 py-1'>Cancel</button>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default CreatePlaylist
