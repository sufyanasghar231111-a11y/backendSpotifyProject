import { RiAlbumLine, RiHeartFill, RiPauseFill, RiPencilLine, RiPlayFill } from '@remixicon/react'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { authHome } from '../contextapi/HomeContext'
import AlbumToPlaylist from '../modals/AlbumToPlaylist'
import { authPlaylist } from '../contextapi/PlaylistContext'
import AlbumMain from '../component/albumpagecomponent/AlbumMain'
import { albumContext } from '../contextapi/ArtistMusicContext'
import { adminContext } from '../contextapi/AdminContext'

const AlbumDetail = () => {
  const { id } = useParams()
  const { fav } = useContext(authHome)
  const { detailData, setDetailData } = useContext(authPlaylist)
  const {user} = useContext(adminContext)

  const { setAlbumEditModal , setAlbumImage, setAlbumPreview} = useContext(albumContext)

  async function detail() {
    try {
      let res = await axios.get(`http://localhost:3000/api/creator/allAlbum/${id}`)
      setDetailData(res.data.detailFetch)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    detail()
  }, [])
  

  const checkOwn = !id || user?._id === detailData?.artist?._id

  return (
    <div className='w-full max-sm:w-full ml-auto sticky rounded-lg overflow-hidden h-[76vh]'>

      <div className={`w-full flex gap-3 bg-gradient-to-br from-[#4e4e4e] via-[#363636] to-[#252525]  sticky p-6 px-7 `}>
        <div className='flex gap-6 items-center'>
          
          <label onClick={()=>{
            if(checkOwn){
              setAlbumEditModal(true)
            }
            }} className=' relative group  bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] w-45 rounded h-45'>
              {
                checkOwn && (
                  <input type="file" onChange={(elem)=>{
                    let file = elem.target.files[0]
                    setAlbumImage(file)
                    setAlbumPreview(URL.createObjectURL(file))
                  }} className='hidden' accept='image/*' />
                )
              }
            <div className=' absolute z-100 flex items-center justify-center w-full h-full ' >
              <RiAlbumLine className=' w-17 h-17' />
            </div>
            {
              detailData?.image && (
                <img src={detailData?.image} className=' absolute z-110 w-full h-full object-cover ' src={detailData.image} alt="" />
              )
            }
            {
              checkOwn && (
            <div className=' absolute hidden group-hover:flex  group-hover:bg-black/50 text-white font-semibold z-112 items-center justify-center flex-col w-full h-full cursor-pointer'>
            <RiPencilLine className='w-10 h-10' />
              <h1 className='text-xl '>Choose Photo</h1>
            </div>
              )
            }
          </label>
          <div>
            <h1 className='text-sm'>Public Playlist</h1>
            <h1 className='text-7xl font-extrabold'>{detailData.title}</h1>
            <h1 className='text-xl pt-4 font-semibold'>{detailData.artist?.username}</h1>
          </div>
        </div>
      </div>
      <div className='h-[65vh] relative px-8 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>
        <div className='px-3 pt-9 pb-2 border-white/10 border-b'>
          <div className='flex items-center gap-10'>
            <h1> #</h1>
            <h1>Title</h1>
          </div>
        </div>
        <div className='pt-3'>
          {
            detailData.album?.map((elem, index) => {
              const isFav = fav?.favorite?.some(song => song.type === 'music' && song.item?._id === elem?._id)
              return <AlbumMain index={index} key={elem._id} isFav={isFav} elem={elem} />
            })
          }

        </div>
      </div>

    </div>
  )
}

export default AlbumDetail
