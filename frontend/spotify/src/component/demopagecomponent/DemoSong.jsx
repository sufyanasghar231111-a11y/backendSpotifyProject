import React, { useContext } from 'react'
import { demoContext } from '../../contextapi/DemoContext'
import { RiMusicLine, RiPlayFill } from '@remixicon/react'

const DemoSong = () => {
    const { musicData, setLoginPopup, demoInput } = useContext(demoContext)
    const filterData = musicData.filter(elem => elem.title.trim().toLowerCase().includes(demoInput.trim().toLowerCase()))
  return (
    <>
        {filterData.map((item) => (
        <div
          key={item?._id}
          className='shrink-0 group w-44 rounded-lg
            transition-all duration-300 hover:bg-white/10
            p-2 mt-5 cursor-pointer'>
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
              <div onClick={()=>{setLoginPopup(true)}} className='px-2 py-2 bottom-2 right-2 rounded-full hidden bg-green-500 absolute z-40 max-sm:flex  group-hover:block'>
                <RiPlayFill />
              </div>
            </div>
          <div>
            <h1 className='font-semibold hover:underline w-fit'>
              {item?.title}
            </h1>
            <div className='flex items-center justify-between'>
            <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
              {item?.artist?.username || 'Unknown'}
            </h1>
            <h1 className='pt-1 text-sm font-semibold text-[#bebebe]'>{}</h1>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default DemoSong