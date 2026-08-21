import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'
import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import DemoSong from './DemoSong'
import DemoAlbumPlaylist from './DemoAlbumPlaylist'
import DemoSkeletonLoader from './DemoSkeletonLoader'
import { demoContext } from '../../contextapi/DemoContext'

const DemoRight = () => {
  const { loader } = useContext(demoContext)
  const sliderRef = useRef(null)

  function leftRef (){
    sliderRef.current.scrollBy({
      left:-250,
       behavior:'smooth'
    })
  }

  function rightRef (){
    sliderRef.current.scrollBy({
      left:250,
      behavior:'smooth'
    })
  }
  return (
    <div className="w-full md:w-[70%] relative max-sm:px-3 max-sm:mx-3 bg-[#282828] h-[76vh] overflow-hidden left rounded-xl flex flex-col">
      {
        loader && <DemoSkeletonLoader />
      }
      
      <div className="px-3 sm:px-5 md:px-7 py-4 md:py-5 flex-shrink-0">
        <h1 className="font-semibold text-xl sm:text-2xl">
          Trending Song
        </h1>
      </div>

      <div  className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-5 md:px-7">

        <div className="relative py-3">
          <button onClick={leftRef}
            className="cursor-pointer absolute hover:bg-black/90
              -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-45
              w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/70 text-white
              flex items-center justify-center"
          >
            <RiArrowLeftSLine />
          </button>

          <div ref={sliderRef} className="flex overflow-x-auto scroll gap-2 sm:gap-3">
            <DemoSong />
          </div>

          <button onClick={rightRef}
            className="cursor-pointer absolute hover:bg-black/90
              -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-40
              w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/70 text-white
              flex items-center justify-center"
          >
            <RiArrowRightSLine />
          </button>
        </div>

        <div className="pt-6 sm:pt-8 md:pt-10 px-1 sm:px-2 pb-4">
          <DemoAlbumPlaylist />
        </div>

      </div>
    </div>
  )
}

export default DemoRight