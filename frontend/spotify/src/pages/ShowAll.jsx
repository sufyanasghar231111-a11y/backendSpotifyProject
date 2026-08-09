import React, { useContext } from 'react'
import { RiPauseFill, RiPlayFill } from '@remixicon/react'

import { Link } from 'react-router-dom'
import { authSearchBar } from '../contextapi/SearchSeparateContext'
import AllSongs from '../component/showallpagecomponent/musicshowall/AllSongs'
import NextPrevButton from '../component/showallpagecomponent/musicshowall/NextPrevButton'

const ShowAll = () => {
  const {  music } = useContext(authSearchBar)

  return (
    <div className='w-full bg-[#282828]  px-4 max-sm:px-4 py-4  h-[80vh] overflow-y-auto left'>
      <h1 className='text-2xl font-bold'>Music </h1>
      <div className='flex max-sm:justify-center max-sm:items-center shrink-0 items-center justify-center w-full relative pb-25 flex-wrap'>
        {music.map((elem) => {
          return <AllSongs key={elem._id} elem={elem} />
        })}
      <div className='flex gap-3 justify-center absolute   bottom-5 md:left-0 left-40 lg:left-65 max-sm:left-2 text-center max-[400px]:left-[35%] items-center  '>
      <NextPrevButton />
      </div>
      </div>
    </div>
  )
}

export default ShowAll
