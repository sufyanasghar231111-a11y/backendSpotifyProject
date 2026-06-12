import React from 'react'

const Loader = () => {
  return (
    <div className=' absolute w-100  h-90 z-150 bg-black inset-0'>
                                            <div className='flex flex-col justify-center w-full h-full items-center gap-4'>
                                                <div className='w-10 h-10 border-[3px] border-[#1DB954] border-t-transparent rounded-full animate-spin'></div>

                                                <h1 className='text-sm text-[#d0d0d0] tracking-wide'>
                                                    Searching...
                                                </h1>
                                            </div>
                                        </div>
  )
}

export default Loader
