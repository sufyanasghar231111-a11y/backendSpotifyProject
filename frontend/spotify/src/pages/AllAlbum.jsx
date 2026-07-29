import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RiPlayListLine } from '@remixicon/react'
import { authSearchBar } from '../contextapi/SearchSeparateContext'
import NextPrevButtonForAlbum from '../component/showallpagecomponent/albumshowall/NextPrevButtonForAlbum'
import AlbumShowall from '../component/showallpagecomponent/albumshowall/AlbumShowall'
import VisibleShowall from '../component/showallpagecomponent/albumshowall/VisibleShowall'

function AllAlbum() {
  const { album, visible } = useContext(authSearchBar)

  const item = [
    ...album.map((elem) => ({
      ...elem,
      type: 'album',
    })),
    ...visible.map((elem) => ({
      ...elem,
      type: 'visible',
    })),
  ]

  return (
    <div className="relative">
      <div className="w-full bg-[#282828] px-5 max-sm:px-4 py-2 h-[80vh] overflow-y-auto pb-20">
        <h1 className="text-2xl font-bold mb-3">Playlist & Album</h1>

        <div className="flex flex-wrap gap-4 max-sm:justify-center">
          {item.map((elem) => (
            <React.Fragment key={elem._id}>
              {/* All Albums */}
              {elem.type === 'album' && (
                <AlbumShowall elem={elem} />
              )}

            {/* All Visible playlist mean public */}
              {elem.type === 'visible' && (
                <VisibleShowall elem={elem} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 w-full h-13 z-100 bg-[#343434]">
        <div className="flex py-2 gap-3 justify-center">
          <NextPrevButtonForAlbum item={item} />
        </div>
      </div>
    </div>
  )
}

export default AllAlbum