import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'
import { authPlaylist, UIPlaylistContext } from '../contextapi/PlaylistContext'

const AddToPlaylist = () => {
  const { getPlayList, patchApi, deleteApi } = useContext(authPlaylist)
  const { hideplaylist, setHidePlaylist } = useContext(UIPlaylistContext)
  let { data } = useContext(authHome)

  return (
    <div>
      {
        hideplaylist && (
          <>
            <div onClick={() => { setHidePlaylist(false) }} className='w-full cursor-pointer h-full inset-0 bg-black/50 backdrop:backdrop-blur-sm  absolute z-160 '></div>
            <div className="absolute top-1/2 left-1/2 z-161 w-[90%] max-sm:w-[70%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#181818] p-6 shadow-xl">

              {/* Close */}
              <button
                onClick={() => setHidePlaylist(false)}
                className="absolute max-sm:text-sm top-4 max-sm:top-3 max-sm:right-3 right-4 text-zinc-400 hover:text-white"
              >
                ✕
              </button>

              {/* Header */}
              <h2 className="text-2xl max-sm:text-lg font-bold text-white">
                Add to Playlist
              </h2>

              <p className="mt-2 max-sm:text-[10px] text-sm text-zinc-400">
                Select a playlist to add or remove this song.
              </p>

              {/* Playlist List */}
              <div className="mt-5 max-h-72 space-y-2 overflow-y-auto">

                {getPlayList.length > 0 ? (
                  getPlayList.map((elem, index) => {
                    const exists = elem.music?.some(
                      song => song._id === data._id
                    );

                    return (
                      <button
                        key={elem._id}
                        onClick={() => {
                          if (exists) {
                            deleteApi(elem._id, data._id);
                          } else {
                            patchApi(elem._id, data._id);
                          }

                          setHidePlaylist(false);
                        }}
                        className={`flex w-full items-center gap-3 max-sm:p-2 rounded-lg p-3 transition ${exists
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-[#282828] hover:bg-[#333]"
                          }`}
                      >
                        <div className="flex h-12 max-sm:h-8 max-sm:w-8 w-12 items-center justify-center rounded-md bg-[#333] font-semibold text-white">
                          {index + 1}
                        </div>

                        <div className="flex-1 text-left">
                          <p className="font-medium max-sm:text-xs text-white">
                            {elem.name}
                          </p>

                          <p className="text-xs max-sm:text-[10px] text-zinc-400">
                            {elem.music?.length || 0} songs
                          </p>
                        </div>

                        {exists && (
                          <span className="text-xs max-sm:text-[10px] font-medium text-white">
                            Added
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-10 text-center">
                    <p className="text-lg font-semibold text-white">
                      No playlists found
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                      Create your first playlist to add songs.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default AddToPlaylist
