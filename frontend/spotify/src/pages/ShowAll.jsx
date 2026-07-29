import React, { useContext } from 'react'
import { RiPauseFill, RiPlayFill } from '@remixicon/react'

import { Link } from 'react-router-dom'
import { authSearchBar } from '../contextapi/SearchSeparateContext'
import AllSongs from '../component/showallpagecomponent/musicshowall/AllSongs'
import NextPrevButton from '../component/showallpagecomponent/musicshowall/NextPrevButton'

const ShowAll = () => {
  const {  music } = useContext(authSearchBar)

  return (
    <div className='w-full bg-[#282828] relative px-4 max-sm:px-4 py-4  h-[80vh] overflow-y-auto'>
      <h1 className='text-2xl font-bold'>Music </h1>
      <div className='flex max-sm:justify-center max-sm:items-center pb-25 flex-wrap'>
        {music.map((elem) => {
          return <AllSongs key={elem._id} elem={elem} />
        })}
      </div>
      <div className='flex gap-3 justify-center absolute   top-5/4 left-1/2   '>
      <NextPrevButton />
      </div>
    </div>
  )
}

export default ShowAll
