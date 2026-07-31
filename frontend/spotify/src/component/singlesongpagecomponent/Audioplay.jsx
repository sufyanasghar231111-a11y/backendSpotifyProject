import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authHome } from '../../contextapi/HomeContext'
import { RiAddCircleLine, RiCheckLine, RiHeartFill, RiMusicLine, RiPauseFill, RiPencilLine, RiPlayFill, RiPlayListAddLine, RiPlayListLine } from '@remixicon/react'
import { authProvider, LibraryContext } from '../../contextapi/AuthContext'
import { UIPlaylistContext } from '../../contextapi/PlaylistContext'
import { fetch } from '../../api/playlistApi'
import RightSidePlayComponent from './RightSidePlayComponent';
import { musicContext } from '../../contextapi/ArtistMusicContext'

const Audioplay = () => {
  let { id } = useParams()
  let { fav, data, setData } = useContext(authHome)
  let { library } = useContext(LibraryContext)
  const { setMusicEditPopup, setThumbNail, setMusicPreview } = useContext(musicContext)
  const { user } = useContext(authProvider)


  async function fetchSingleMusic() {
    try {
      const res = await fetch(id)
      setData(res.data.detail)
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {

    fetchSingleMusic()
  }, [])


  const isFav = fav?.favorite?.some(user =>
    user.type === 'music' && user.item._id === data?._id
  )

  const deleteId = fav?.favorite?.find(user =>
    user.type === 'music' && user.item._id === data?._id
  )

  const lib = library.some(user =>
    user.music.some(song => song._id === data?._id)
  )


  const checkOwn = !id || user?._id === data.artist?._id

  return (
    <>
      <label onClick={() => { 
        if(checkOwn){
          setMusicEditPopup(true)
        }
         }} className='relative  h-[70vh] w-[60%] bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] rounded-2xl overflow-hidden group '>
          {
            checkOwn && (
              <input type="file" accept='image/*' onChange={(elem)=>{
                let file = elem.target.files[0]
                setThumbNail(file)
                if(file){
                  setMusicPreview(URL.createObjectURL(file))
                }
              }} className='hidden' />
            )
          }
        <div className=' absolute flex items-center z-100 justify-center w-full h-full'>
          <RiMusicLine className='w-15 h-15' />
        </div>
        <div className='w-full absolute overflow-hidden z-110 h-full'>
          {
            data?.image && (
              <img
                src={data?.image}
                className='w-full h-full object-cover block'
              />
            )
          }

          {
            checkOwn && (
              <div className=' absolute z-111 group-hover:bg-black/50 w-full h-full group-hover:flex hidden items-center justify-center  flex-col'>
                <RiPencilLine className='w-17 h-17' />
                <h1 className='text-4xl font-semibold'>Choose Image </h1>
              </div>
            )
          }
        </div>

        <div className='absolute inset-0 bg-black/30'></div>
      </label>

      <RightSidePlayComponent isFav={isFav} lib={lib} deleteId={deleteId} />

    </>
  )
}


export default Audioplay



