import React, { useContext } from 'react'
import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import { authHome } from '../../contextapi/HomeContext'
import LikedPlaylist from './LikedPlaylist'
import LikedSong from './LikedSong'

const AllAlbumsongplaylist = () => {
    
      const { fav } = useContext(authHome)
  return (
    <>
        {fav?.favorite?.map((music, index) => {
                return <>

                  {music.type === 'music' && (
                    <LikedSong key={music?.item?._id} music={music} index={index} />
                  )}

                  {music.type === "playlist" && (
                   <LikedPlaylist key={music?.item?._id} music={music} index={index} />
                  )}

                  {
                    music.type === 'album' && (
                      <div>album</div>
                    )
                  }
                </>
              })
              }
    </>
  )
}

export default AllAlbumsongplaylist