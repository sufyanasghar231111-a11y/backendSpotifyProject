import { RiAlbumLine, RiArrowLeftSLine, RiArrowRightSLine, RiPlayListLine } from '@remixicon/react'
import React, { useContext, useRef } from 'react'
import { timeAgo } from '../../utils/TimeAgo'
import { demoContext } from '../../contextapi/DemoContext'

const DemoAlbumPlaylist = () => {
  const { albumData, playlistData, demoInput } = useContext(demoContext)

  const items = [
    ...albumData.map(elem => ({
      ...elem,
      type: 'album'
    })),

    ...playlistData.map(elem => ({
      ...elem,
      type: 'playlist'
    }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const search = demoInput.trim().toLowerCase();

  const filterData = items.filter(elem => {
    const value = elem.type === 'playlist' ? elem.name : elem.title;

    return value?.trim().toLowerCase().includes(search);
  });

  const sliderRef = useRef()

  function rightRef() {
    sliderRef.current.scrollBy({
      left: 250,
      behavior: 'smooth'
    })
  }

  function leftRef() {
    sliderRef.current.scrollBy({
      left: -250,
      behavior: 'smooth'
    })
  }

  return (
    <div className='relative'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg sm:text-xl md:text-2xl font-bold'>
          Album by Artist
        </h1>
      </div>

      <button onClick={leftRef}
        className='cursor-pointer absolute hover:bg-black/90
          -left-2 sm:-left-4 md:-left-5 top-1/2 -translate-y-1/2 z-20
          w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/70 text-white
          flex items-center justify-center'
      >
        <RiArrowLeftSLine />
      </button>

      <div ref={sliderRef} className='flex relative overflow-x-auto scroll gap-2 sm:gap-3'>
        {filterData.map((item) => {
          return <React.Fragment key={item._id}>
            {item.type === 'album' && (
              <div
                className='shrink-0 group w-32 sm:w-40 md:w-44 rounded-lg
                  transition-all duration-300 hover:bg-white/10
                  p-2 mt-4 sm:mt-5 cursor-pointer'
              >
                <div className='relative rounded-lg overflow-hidden w-full bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] h-32 sm:h-36 md:h-40'>
                  {
                    item.type === 'album' && (
                      <div className='z-15 absolute flex items-center justify-center w-full h-full'>
                        <RiAlbumLine className='w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15' />
                      </div>
                    )
                  }
                  {
                    item?.image && (
                      <img
                        className='w-full h-full absolute z-17 object-cover'
                        src={item.image}
                        alt=''
                      />
                    )
                  }
                </div>

                <div>
                  <h1 className='text-sm sm:text-base font-semibold hover:underline w-fit truncate'>
                    {item.title}
                  </h1>
                  <div className='flex items-center justify-between gap-1'>
                    <h1 className='pt-1 text-xs sm:text-sm font-semibold text-[#bebebe] hover:underline w-fit truncate'>
                      {item.artist?.username || 'Unknown'}
                    </h1>
                    <h1 className='pt-1 text-[9px] sm:text-[10px] font-semibold text-[#bebebe] whitespace-nowrap'>
                      {timeAgo(item?.createdAt)}
                    </h1>
                  </div>
                </div>
              </div>
            )}

            {
              item.type === 'playlist' && (
                <div
                  className='shrink-0 group w-32 sm:w-40 md:w-44 rounded-lg
                    transition-all duration-300 hover:bg-white/10
                    p-2 mt-4 sm:mt-5 cursor-pointer'
                >
                  <div className='rounded-lg overflow-hidden w-full h-32 sm:h-36 md:h-40'>
                    {
                      item?.playlistPic ? (
                        <img
                          className='w-full h-full object-cover'
                          src={item?.playlistPic}
                          alt=''
                        />
                      ) : (
                        <div className='flex items-center justify-center bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] w-full h-full'>
                          <RiPlayListLine className='h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20' />
                        </div>
                      )
                    }
                  </div>
                  <div className='flex items-center justify-between gap-1'>
                    <div className='min-w-0'>
                      <h1 className='text-sm sm:text-base font-semibold hover:underline w-fit truncate'>
                        {item.name}
                      </h1>
                      <h1 className='pt-1 text-xs sm:text-sm font-semibold text-[#bebebe] hover:underline w-fit truncate'>
                        {item.user?.username || 'UnKnown'}
                      </h1>
                    </div>
                    <h1 className='pt-1 text-[9px] sm:text-[10px] font-semibold text-[#bebebe] whitespace-nowrap'>
                      {timeAgo(item?.createdAt)}
                    </h1>
                  </div>
                </div>
              )
            }
          </React.Fragment>
        })}
      </div>

      <button onClick={rightRef}
        className='cursor-pointer absolute hover:bg-black/90
          -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20
          w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/70 text-white
          flex items-center justify-center'
      >
        <RiArrowRightSLine />
      </button>
    </div>
  )
}

export default DemoAlbumPlaylist