import React, { useContext } from 'react'
import { demoContext } from '../../contextapi/DemoContext'
import { RiMusicLine, RiPlayFill } from '@remixicon/react'

const DemoSong = () => {
  const { musicData, setLoginPopup, demoInput } = useContext(demoContext)

  const filterData = musicData.filter((elem) =>
    elem.title
      ?.trim()
      .toLowerCase()
      .includes(demoInput.trim().toLowerCase())
  )

  return (
    <>
      {filterData.length > 0 ? (
        filterData.map((item) => (
          <div
            key={item?._id}
            className="
              shrink-0 group w-44 rounded-lg p-2 mt-5 cursor-pointer
              transition-all duration-300 hover:bg-white/10
            "
          >
            <div className="relative w-full h-40 overflow-hidden rounded-lg bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5]">

              {/* Fallback icon */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <RiMusicLine className="w-15 h-15" />
              </div>

              {/* Song image */}
              {item?.image && (
                <img
                  className="relative z-20 w-full h-40 object-cover rounded-lg"
                  src={item.image}
                  alt={item.title}
                />
              )}

              {/* Play button */}
              <button
                onClick={() => setLoginPopup(true)}
                className="
                  absolute bottom-2 right-2 z-30
                  p-2 rounded-full
                  bg-green-500 text-black
                  transition-all duration-200
                  opacity-0 translate-y-2
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  max-sm:opacity-100
                  max-sm:translate-y-0
                "
              >
                <RiPlayFill />
              </button>
            </div>

            {/* Song information */}
            <div>
              <h1 className="font-semibold hover:underline w-fit truncate">
                {item?.title}
              </h1>

              <div className="flex items-center justify-between">
                <h2 className="pt-1 text-sm font-semibold text-[#bebebe] hover:underline w-fit truncate">
                  {item?.artist?.username || 'Unknown'}
                </h2>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full min-h-40 flex items-center justify-center text-[#b3b3b3]">
          <p className="text-sm">
            No songs found
          </p>
        </div>
      )}
    </>
  )
}

export default DemoSong