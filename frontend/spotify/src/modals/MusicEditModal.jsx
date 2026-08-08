import React, { useContext } from 'react'
import { musicContext } from '../contextapi/ArtistMusicContext'
import { RiCloseLine, RiMusicLine, RiPencilLine, RiUserLine } from '@remixicon/react'
import { authHome } from '../contextapi/HomeContext'

const MusicEditModal = () => {
  const { musicEditPopup, setMusicEditPopup, setTitle, setThumbNail, title , musicPreview, setMusicPreview, updateMusic, deleteMusicPic} = useContext(musicContext)
  const {data} = useContext(authHome)
  
  return (
    <>
      {
        musicEditPopup && (
          <>
            <div onClick={() => {
              setMusicEditPopup(false)
            }} className='fixed w-full h-full inset-0 bg-black/50 z-200 cursor-pointer'></div>
            <div className='w-[calc(100%-2rem)] sm:w-125 max-w-125 bg-[#282828] rounded-lg fixed top-1/2 left-1/2 z-201 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto'>
              <div className='flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4'>
                <h1 className='text-lg sm:text-2xl font-bold'>Music Update</h1>
                <div className='px-1.5 py-1.5 rounded-full hover:bg-[#3E3E3E]'>
                  <h1 onClick={() => { setMusicEditPopup(false) }}><RiCloseLine className='w-5 h-5 text-[#9c9a9a] cursor-pointer' /></h1>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-6 sm:gap-0 px-4 pt-6 sm:pt-10 py-4'>
                <div className='w-32 h-32 sm:w-45 sm:h-45 group rounded-full flex items-center justify-center flex-col overflow-hidden relative'>
                  <div className='w-full h-full absolute inset-0 z-59 group-hover:bg-black/50 active:bg-black/50'></div>
                  <label htmlFor='photo' className='top-10 max-sm:flex -translate-y-1/2 font-semibold hidden group-hover:block hover:border-b text-sm sm:text-[17px] absolute z-60 text-center px-2'>Choose photo</label>
                  <RiPencilLine className='text-white hidden max-sm:flex  group-hover:block absolute z-60 top-14 sm:top-15 w-8 h-8 sm:w-13 sm:h-13' />
                  <RiMusicLine className='w-16 h-16 sm:w-20 sm:h-20 absolute text-[#7F7F7F]' />
                  <img src={ musicPreview || data?.image} className='w-full h-full absolute scale-105 pointer-events-none z-20 inset-0 object-cover' />
                  <input name="profileImage" accept="image/*" id='photo' onChange={(elem)=>{
                    let file = elem.target.files[0]
                    setThumbNail(file)
                    if(file){
                      setMusicPreview(URL.createObjectURL(file))
                    }
                  }} type="file" className='hidden' />
                  <h1 onClick={()=>{deleteMusicPic(data?._id)}} className='bottom-4 max-sm:flex  sm:bottom-7 hidden cursor-pointer group-hover:block hover:border-b font-semibold text-xs sm:text-[17px] absolute z-60'>Remove photo</h1>
                </div>
                <div className='flex flex-col items-center sm:items-end w-full sm:w-auto'>
                  <input type="text"  value={title} onChange={(elem)=>{setTitle(elem.target.value)}} className='outline-0 font-bold text-sm w-full sm:w-60 bg-[#3E3E3E] mb-4 sm:mb-6 py-2 rounded px-3' />
                  <button onClick={()=>{updateMusic(data?._id)}}  className='rounded-full px-4 py-1.5 text-sm bg-white text-black font-bold w-full sm:w-auto'>Save</button>
                </div>
              </div>
              <div className='pt-6 sm:pt-8 pb-4 px-4 sm:px-5'>
                <h1 className='text-[11px] sm:text-[12px] font-semibold text-[#9c9a9a] sm:text-white'>By proceeding, you agree to give Spotify access to the image you choose to upload. <br className='hidden sm:block' /> Please make sure you have the right to upload the image.</h1>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default MusicEditModal