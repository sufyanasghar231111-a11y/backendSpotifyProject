import React, { useContext } from 'react'


import { RiArrowLeftSLine, RiArrowRightSLine, RiMusicLine, RiPauseFill, RiPlayFill } from '@remixicon/react'
import { Link } from 'react-router-dom'
import { authSearchBar } from '../../contextapi/SearchSeparateContext';
import PlayButton from './PlayButton';
const RightSideMusicPlay = () => {
  const { music } = useContext(authSearchBar)


  return (

    <>
      {music.map((item) => (
        <div
          key={item?._id}
          className='shrink-0 group w-44 rounded-lg
            transition-all duration-300 hover:bg-white/10
            p-2 mt-5 cursor-pointer'>
          <Link to={`/detail/${item?._id}`}>
            <div  className='relative rounded-lg overflow-hidden w-full bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] h-40'>
              <div className=' absolute flex items-center z-39 justify-center w-full h-full'>
                <RiMusicLine className='w-15 h-15' />
              </div>
              <div className=' w-full h-full absolute z-40'>
                {
                  item?.image && (
                    <img
                      className='w-full h-40   object-cover rounded'
                      src={item?.image}
                      alt={item?.title}
                    />
                  )
                }
              </div>

              <PlayButton item={item} />
            </div>
          </Link>
          <div>
            <h1 className='font-semibold hover:underline w-fit'>
              {item?.title}
            </h1>
            <div className='flex items-center justify-between'>
            <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
              {item?.artist?.username}
            </h1>
            <h1 className='pt-1 text-sm font-semibold text-[#bebebe]'>{}</h1>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default React.memo(RightSideMusicPlay)
