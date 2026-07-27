import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RiPlayListLine } from '@remixicon/react'
import { authSearchBar } from '../../contextapi/SearchSeparateContext'

function AllAlbum() {
  const { album, page, setPage, visible } = useContext(authSearchBar)

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
              {elem.type === 'album' && (
                <div className="group w-[160px] max-sm:w-[46%] rounded-lg p-2 transition-all duration-300 hover:bg-white/10 cursor-pointer">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Link to={`/albumdetail/${elem._id}`}>
                      <img
                        className="w-full h-full object-cover"
                        src="https://i.scdn.co/image/ab67616d0000b2736fd2559f0879066633e56c42"
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="mt-2">
                    <h1 className="font-semibold truncate hover:underline">
                      {elem.title}
                    </h1>

                    <p className="text-sm text-[#b3b3b3] truncate">
                      {elem.artistName}
                    </p>
                  </div>
                </div>
              )}

              {elem.type === 'visible' && (
                <div className="group w-[160px] max-sm:w-[46%] rounded-lg p-2 transition-all duration-300 hover:bg-white/10 cursor-pointer">
                  <div className="w-full aspect-square rounded-lg overflow-hidden">
                    <Link to={`/visible/${elem._id}`}>
                      {elem.playlistPic ? (
                        <img
                          className="w-full h-full object-cover"
                          src={elem.playlistPic}
                          alt=""
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5]">
                          <RiPlayListLine className="w-16 h-16" />
                        </div>
                      )}
                    </Link>
                  </div>

                  <div className="mt-2">
                    <h1 className="font-semibold truncate hover:underline">
                      {elem.name}
                    </h1>

                    <p className="text-sm text-[#b3b3b3] truncate">
                      {elem.user?.username}
                    </p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 w-full h-13 z-100 bg-[#343434]">
        <div className="flex py-2 gap-3 justify-center">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-2 py-1 rounded-full ${
              page === 1
                ? 'opacity-60 cursor-not-allowed'
                : 'opacity-100 cursor-pointer'
            } bg-[#4b4a4a]`}
          >
            Prev
          </button>

          <button
            disabled={item.length < 8}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-2 py-1 rounded-full ${
              item.length < 8
                ? 'opacity-60 cursor-not-allowed'
                : 'opacity-100 cursor-pointer'
            } bg-[#4b4a4a]`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllAlbum