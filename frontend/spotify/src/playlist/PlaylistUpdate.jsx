import React, { useContext } from 'react'
import { playlistUpdate } from '../contextapi/PlaylistUpdateContext'
import { RiHeartFill, RiPlayListLine, RiPlayFill, RiShuffleLine, RiPencilLine } from '@remixicon/react'

const PlaylistUpdate = ({isOwn, separate}) => {

  const { setShowUpdate,  setPlaylistPfp, setImagePreview } = useContext(playlistUpdate)
  return (
    <div onClick={() => {
            if(isOwn){
              setShowUpdate(true) 
            }
           }} className="group relative flex h-40 w-40 items-center justify-center rounded bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] cursor-pointer overflow-hidden">
            <label className="group relative flex h-40  w-40 cursor-pointer items-center justify-center overflow-hidden rounded bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5] shadow-xl">
              <RiPlayListLine className={`absolute z-10 h-20 w-20 text-white transition-opacity duration-300 ${isOwn ? 'group-hover:opacity-0':''}`} />
               {
                  separate?.playlistPic ? (
                    <img
                src={separate?.playlistPic}
                alt=""
                className="absolute inset-0 z-11 h-full  w-full object-cover transition duration-300 group-hover:brightness-50"
              />
                  ):(
                    null
                  )
                }

              {
                isOwn && (
                    <>

                <div className="absolute z-12 inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                <RiPencilLine className="mb-2 h-7 w-7 text-white" />
                <span className="text-sm font-semibold text-white">
                  Choose photo
                </span>
              </div>
              
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e)=>{
                      const file = e.target.files[0]
                      setPlaylistPfp(file)
                      if(file) {
                        setImagePreview(URL.createObjectURL(file))
                      }
                    }}
                  />
                </>
                )
              }

            </label>
          </div>
  )
}

export default PlaylistUpdate