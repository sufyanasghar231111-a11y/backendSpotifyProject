import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'

import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'
import { Link } from 'react-router-dom'
import Album from '../home/Album'
import RecentPlay from '../recentactivity/RecentPlay'
import RightSideMusicPlay from './RightSideMusicPlay'


const RightsideMusic = () => {
      let { rightRef, leftRef, silderRef } = useContext(authHome)
     
  return (
     <div className='h-[65vh] relative px-8 max-sm:px-3 py-3 bg-[#282828]   overflow-y-auto '>

              <h1 className='text-sm font-semibold text-[#bbb]'>Inspired by your recent activity</h1>
              <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold'>Music</h1>
                <Link to='showall' className='font-semibold text-[#a5a5a5]  hover:border-b'>Show all</Link>
              </div>
              <button
                onClick={leftRef}
                className={` cursor-pointer absolute  hover:bg-black/90  left-2  top-45 -translate-y-1/2 z-40
        w-10 h-10 rounded-full bg-black/70 text-white
        flex items-center justify-center`}>

                <RiArrowLeftSLine />
              </button>
              <div ref={silderRef} className='flex   overflow-x-auto scroll'>
               <RightSideMusicPlay />
              </div>
              <button
                onClick={rightRef}
                className='absolute cursor-pointer hover:bg-black/90 right-2 max-sm:right-0  top-45 -translate-y-1/2 z-20
        w-10 h-10 rounded-full bg-black/70 text-white
        flex items-center justify-center' >
                <RiArrowRightSLine />
              </button>
              <div className='pt-10 px-2'>
                <Album />
              </div>
              <div className='pt-10 px-2 '>
                <RecentPlay />
              </div>
            </div>
  )
}

export default RightsideMusic
