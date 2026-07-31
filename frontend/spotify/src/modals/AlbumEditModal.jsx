import React, { useContext } from 'react'
import { RiAlbumLine, RiCloseLine, RiPencilLine, RiUserLine } from '@remixicon/react'
import { albumContext } from '../contextapi/ArtistMusicContext'
import { authPlaylist } from '../contextapi/PlaylistContext'

const AlbumEditModal = () => {
    const { albumEditModal, setAlbumEditModal, albumPreview, setAlbumPreview, albumName, setAlbumName, setAlbumImage, updateArtistAlbum, deleteAlbumPic } = useContext(albumContext)
     const { detailData } = useContext(authPlaylist)
  return (
      <>
      {
        albumEditModal && (
          <>
            <div onClick={() => {
              setAlbumEditModal(false)
            }} className=' absolute w-full h-full inset-0 bg-black/50 z-200 cursor-pointer'></div>
            <div className='w-125  bg-[#282828] rounded-lg  absolute top-1/2 left-1/2 z-201 -translate-x-1/2 -translate-y-1/2'>
              <div className='flex items-center justify-between px-5 py-4'>
                <h1 className='text-2xl font-bold'>Music Update</h1>
                <div className='px-1.5 py-1.5 rounded-full hover:bg-[#3E3E3E]'>
                  <h1 onClick={() => { setAlbumEditModal(false) }}><RiCloseLine className='w-5 h-5 text-[#9c9a9a]' /></h1>
                </div>
              </div>
              <div className='flex items-center justify-between  px-4  pt-10 py-4'>
                <div className='  w-45 group rounded-full  flex items-center justify-center flex-col h-45  overflow-hidden relative pt-4'>
                  <div className='w-full h-full absolute inset-0 z-59 group-hover:bg-black/50'></div>
                  <label htmlFor='photo' className=' top-6 font-semibold hidden group-hover:block hover:border-b text-[17px] absolute z-60'>Choose photo</label>
                  <RiPencilLine className='text-white hidden group-hover:block  absolute z-60 top-15 w-13 h-13 ' />
                  <RiAlbumLine className='w-20  absolute h-20 text-[#7F7F7F]' />
                  <img src={albumPreview || detailData.image }  className='w-full h-full absolute scale-105 pointer-events-none z-20 inset-0 object-cover' />
                  <input onChange={(elem)=>{
                    let file = elem.target.files[0]
                    setAlbumImage(file)
                    if(file){
                      setAlbumPreview(URL.createObjectURL(file))
                    }
                  }} name="profileImage" accept="image/*" id='photo'  type="file" className='hidden' />
                  <h1 onClick={()=>{deleteAlbumPic(detailData._id)}} className='bottom-7 hidden cursor-pointer group-hover:block hover:border-b  font-semibold text-[17px] absolute z-60'>Remove photo</h1>
                </div>
                <div className='flex flex-col items-end'>
                  <input value={albumName} onChange={(elem)=>{ setAlbumName(elem.target.value)}} type="text"    className='outline-0 font-bold text-sm w-60 bg-[#3E3E3E] mb-6 py-2 rounded px-3' />
                  <button onClick={()=>{updateArtistAlbum(detailData?._id)}}  className='rounded-full px-4 py-1.5 text-sm bg-white  text-black font-bold'>Save</button>
                </div>
              </div>
              <div className='pt-8 pb-4 px-5'>
                <h1 className='text-[12px] font-semibold'>By proceeding, you agree to give Spotify access to the image you choose to upload. <br /> Please make sure you have the right to upload the image.</h1>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default AlbumEditModal
