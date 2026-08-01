import React, { useContext, useRef } from 'react'
import { RiAlbumLine, RiArrowLeftSLine, RiArrowRightSLine, RiMusicLine, RiPlayFill, RiPlayListLine } from '@remixicon/react'
import { Link } from 'react-router-dom';
import { authRecent } from '../../contextapi/RecentRoute';
import { authSearchBar } from '../../contextapi/SearchSeparateContext';
import { timeAgo } from '../../utils/TimeAgo';

const Album = () => {
  const { album, visible } = useContext(authSearchBar)
  const { updateAlbum } = useContext(authRecent)

  const sliderRef = useRef(null)

  function leftRef() {
    sliderRef.current.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }

  function rightRef() {
    sliderRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }

  const items = [
    ...album.map(elem => ({
      ...elem,
      type: 'album'
    })),

    ...visible.map(elem => ({
      ...elem,
      type: 'visible'
    }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))



  return (
    <div className=' relative'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>
          Album by Artist
        </h1>
        <Link to='/showallalbum'>
          <h1 className='font-semibold text-[#a5a5a5] hover:border-b border-white'>Show all</h1>
        </Link>
      </div>
      <button
        onClick={leftRef}
        className={` cursor-pointer absolute  hover:bg-black/90  -left-5 top-1/2 -translate-y-1/2 z-20
        w-10 h-10 rounded-full bg-black/70 text-white
        flex items-center justify-center`}
      >
        <RiArrowLeftSLine />
      </button>
      <div ref={sliderRef} className='flex relative  overflow-x-auto scroll'>
        {items.map((item) => {
          return <>
            {item.type === 'album' && (
              <div onClick={() => { updateAlbum(item._id) }}
                key={item._id}
                className='shrink-0 group w-44 rounded-lg
            transition-all duration-300 hover:bg-white/10
            p-2 mt-5 cursor-pointer'
              >
                  <Link to={`/albumdetail/${item._id}`}>
                <div className=' relative rounded-lg overflow-hidden w-full bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] h-40'>
                  {
                    item.type === 'album' && (
                      <div className=' z-15 absolute flex items-center justify-center w-full h-full'>
                        <RiAlbumLine className='w-15 h-15' />
                      </div>
                    )
                  }
                  {
                    item?.image && (
                      <img
                        className='w-full h-full  absolute z-17 object-cover'
                        src={item.image}
                        alt=''
                      />
                    )
                  }

                </div>
                  </Link>
                <div>
                  <h1 className='font-semibold hover:underline w-fit'>
                    {item.title}
                  </h1>
                  <div className='flex items-center justify-between'>
                  <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
                    {item.artist?.username}
                  </h1>
                  <h1 className='pt-1 text-[10px] font-semibold text-[#bebebe]'>
                    {timeAgo(item?.createdAt)}
                  </h1>
                  </div>
                </div>
              </div>
            )}

            {
              item.type === 'visible' && (
                <div
                  key={item._id}
                  className='shrink-0 group w-44 rounded-lg
            transition-all duration-300 hover:bg-white/10
            p-2 mt-5 cursor-pointer'
                >
                  <div className=' rounded-lg overflow-hidden w-full h-40'>
                    <Link to={`/visible/${item._id}`}>
                      {
                        item?.playlistPic ? (
                          <img
                            className='w-full h-full object-cover'
                            src={item?.playlistPic}
                            alt=''
                          />
                        ) :
                          (
                            <div className='flex items-center justify-center bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] w-full h-full'>
                              <RiPlayListLine className='h-20 w-20' />
                            </div>
                          )
                      }

                    </Link>

                  </div>
                  <div>
                    <h1 className='font-semibold hover:underline w-fit'>
                      {item.name}
                    </h1>
                    <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
                      {item.user?.username}
                    </h1>
                  </div>
                </div>
              )
            }
          </>
        })}

      </div>
      <button
        onClick={rightRef}
        className={` cursor-pointer absolute  hover:bg-black/90 -right-6  top-1/2 -translate-y-1/2 z-20
        w-10 h-10 rounded-full bg-black/70 text-white
        flex items-center justify-center` }
      >
        <RiArrowRightSLine />
      </button>
    </div>
  )
}

export default Album
