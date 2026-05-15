import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import React, { useContext } from 'react'
import { authHome } from '../component/contextapi/HomeContext'
import Input from './Input'

const LikeSong = () => {
  let { fav, playing, playRef, audioRef, setPlaying, deletemusic, loaderTime, handleTime, duration, handleSeek, currentTime } = useContext(authHome)

  return (
    <div>
      <div>
        <div className='w-full max-sm:w-full ml-auto sticky rounded-lg overflow-hidden h-[76vh] flex flex-col'>

          {/* HEADER */}
          <div className='w-full flex gap-3 bg-[#2C1F54] sticky p-6 px-7'>
            <div className='flex gap-6 items-center'>

              <div className='w-40 flex items-center justify-center bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] rounded h-40'>
                <RiHeartFill className='text-white w-20 h-20' />
              </div>

              <div>
                <h1 className='text-7xl font-extrabold'>Liked Songs</h1>
                <h1 className='text-xl font-semibold'>
                  {fav?.[0]?.user?.username}
                </h1>
              </div>

            </div>
          </div>

          {/* LIST */}
          <div className='h-full relative px-8 max-sm:px-3 py-3 bg-[#282828] overflow-y-auto'>

            <div className='px-3 pt-9 pb-2 border-white/10 border-b'>
              <div className='flex items-center gap-10'>
                <h1>#</h1>
                <h1>Title</h1>
              </div>
            </div>

            <div className='pt-3'>

              {fav?.map((item) =>
                item.favorite?.map((music, index) => {
                  return <>
                    <div
                      key={music._id}
                      className='flex group hover:bg-white/10 transition-all duration-300 py-3 px-2 rounded-lg w-full gap-6'
                    >
                      <div className='relative'>
                        <span className='group-hover:scale-0 scale-100 absolute top-3 transition-all duration-300'>
                          {index + 1}
                        </span>
                        <span onClick={() => { playRef(music?._id) }} className='group-hover:scale-100 scale-0 absolute top-3.5 -left-1 transition-all duration-300'>
                          {playing === music._id ? (<RiPauseFill className='text-white cursor-pointer w-5 h-5' />) : (<RiPlayFill className='text-white cursor-pointer w-5 h-5' />)
                          }
                        </span>
                      </div>

                      <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center gap-3'>

                          <div className='w-12 h-12 border rounded overflow-hidden'>
                            <img
                              className='w-full h-full object-cover'
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wl5xfVuzRmBNbqj8mKwsqAKwptQPO3LE7Q&s"
                              alt=""
                            />

                            <audio ref={(el) => {
                              if (!audioRef.current) {
                                audioRef.current = {}
                              }

                              if (el) {
                                audioRef.current[music._id] = el
                              }
                              else {
                                delete audioRef.current[music._id]
                              }
                            }} onEnded={() => {
                              setPlaying(null)

                              currentTime(0)
                              duration(0)
                            }} className='w-full' onLoadedMetadata={() => { loaderTime(music._id) }} onTimeUpdate={() => { handleTime(music._id) }} src={music?.uri} controls />
                          </div>
                          <div>
                            <h1 className='font-semibold'>{music.title}</h1>
                            <h1 className='text-sm text-white/60'>
                              {music.artist?.username}
                            </h1>
                          </div>
                        </div>
                        <div onClick={() => { deletemusic(music._id) }}>
                          <RiHeartFill className='text-red-500 cursor-pointer w-5 h-5' />
                        </div>
                      </div>
                      <Input key={music._id}
                        music={music}
                        currentTime={currentTime}
                        duration={duration}
                        handleSeek={handleSeek} />

                    </div>
                  </>
                })
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default LikeSong
