import { RiArrowLeftSLine, RiArrowRightSLine, RiPlayFill } from '@remixicon/react'
import React, { useRef } from 'react'

const Right = () => {
  let silderRef=useRef()

  function rightRef(){
    silderRef.current.scrollBy({
      left:300,
      behavior:'smooth'
    })
  }
  function leftRef(){
    silderRef.current.scrollBy({
      left:-300,
      behavior:'smooth'
    })
  }

  return (
    <div className='w-[70%] max-sm:w-full ml-auto sticky rounded-lg overflow-hidden h-[76vh]'>
      <div className='w-full flex gap-3 bg-[#282828]  sticky p-5 px-7'>
      <button className='px-4 py-1.5 rounded-full text-sm font-semibold bg-white text-black cursor-pointer'>All</button>
      <button className='px-4 py-1.5 rounded-full text-sm  font-semibold backdrop-blur-2xl bg-white/10 cursor-pointer'>Music</button>
      </div>
      <div className='h-[60vh] px-8 py-3 bg-[#282828]   overflow-y-auto '>
        <div>
       <h1  className='text-2xl font-bold'>Music</h1>
       <div ref={silderRef} className='flex relative  overflow-x-auto scroll'>
        <button
        onClick={leftRef}
        className='fixed left-[32%] top-1/2 -translate-y-1/2 z-20
        w-10 h-10 rounded-full bg-black/70 text-white
        flex items-center justify-center'
      >
        <RiArrowLeftSLine />
      </button>
        {[1,2,3,4,5,6,7].map((item) => (

          <div
            key={item}
            className='shrink-0 group w-44 rounded-lg
            transition-all duration-300 hover:bg-white/10
            p-2 mt-5 cursor-pointer'
          >

            <div className='relative rounded-lg overflow-hidden w-full h-40'>

              <img
                className='w-full h-full object-cover'
                src='https://i.scdn.co/image/ab67616d0000b2736fd2559f0879066633e56c42'
                alt=''
              />

              <div className='absolute bottom-3 right-3
              flex items-center justify-center
              w-12 h-12 rounded-full hover:bg-green-600 bg-green-500
              opacity-0 translate-y-4
              group-hover:translate-y-0
              group-hover:opacity-100
              transition-all duration-300 ease-out shadow-lg'>

                <RiPlayFill className='text-black w-7 h-7' />
              </div>
            </div>
            <div>
              <h1 className='font-semibold hover:underline w-fit'>
                7 Weeks & 3Days
              </h1>

              <h1 className='pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit'>
                IcyBeasts
              </h1>
            </div>

          </div>
        ))}
        <button
        onClick={rightRef}
        className='fixed right-6 top-1/2 -translate-y-1/2 z-20
        w-10 h-10 rounded-full bg-black/70 text-white
        flex items-center justify-center'
      >
          <RiArrowRightSLine />
      </button>
       </div>
       </div>
        </div>

      </div>
   

  )
}

export default Right
