import React, { useContext } from 'react'


import { RiArrowLeftSLine, RiArrowRightSLine, RiPauseFill, RiPlayFill } from '@remixicon/react'
import { Link } from 'react-router-dom'
import { authSearchBar } from '../../contextapi/SearchSeparateContext';
import PlayButton from './PlayButton';
const RightSideMusicPlay = () => {
  let { music, isloading,error } = useContext(authSearchBar)

  if(isloading) return <div >is Loading</div>
  if(error) return <div>is error</div>

  return (

    <>
      {music.map((item) => (
        <div
          key={item._id}
          className='shrink-0 group w-44 rounded-lg
            transition-all duration-300 hover:bg-white/10
            p-2 mt-5 cursor-pointer'>

          <div className='relative rounded-lg overflow-hidden w-full h-40'>
            <Link to={`/detail/${item._id}`}>

              <img
                className='w-full h-40 object-cover rounded'
                src={item.image}
                alt={item.title}
              />
            </Link>

            <PlayButton item={item} />
          </div>
          <div>
            <h1 className='font-semibold hover:underline w-fit'>
              {item.title}
            </h1>
            <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
              {item.artist?.username}
            </h1>
          </div>
        </div>
      ))}
    </>
  )
}

export default React.memo(RightSideMusicPlay)
