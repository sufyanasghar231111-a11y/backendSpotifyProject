import React, { useContext } from 'react'
import { RiCloseLine } from '@remixicon/react'
import { authPlaylist, UIPlaylistContext } from '../contextapi/PlaylistContext'

const CreatePlaylist = () => {
  const { handleCreatePlaylist, name, setName } = useContext(authPlaylist)
  const { hideplay, setHidePlay } = useContext(UIPlaylistContext)

  const close = () => setHidePlay(false)
  const canCreate = name?.trim().length > 0

  return (
    <div>
      {hideplay && (
        <>
          {/* Backdrop */}
          <div
            onClick={close}
            className="
              fixed inset-0
              cursor-pointer
              bg-black/60
              backdrop-blur-sm
              z-160
              animate-[fadeIn_0.15s_ease-out]
            "
          />

          {/* Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-playlist-title"
            className="
              fixed top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              z-162
              w-65 md:w-72 lg:w-80 max-sm:w-[85vw]
              animate-[popIn_0.18s_ease-out]
            "
          >
            <div
              className="
                relative
                rounded-2xl
                bg-[#282828]
                border border-white/10
                shadow-2xl shadow-black/40
                px-5 pt-6 pb-5
                flex flex-col items-center text-center
              "
            >
              {/* Close */}
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="
                  absolute top-3 right-3
                  w-7 h-7
                  flex items-center justify-center
                  rounded-full
                  text-gray-400
                  hover:text-white
                  hover:bg-white/10
                  transition-colors duration-150
                  cursor-pointer
                "
              >
                <RiCloseLine size={18} />
              </button>

              {/* Accent icon */}
              <div
                className="
                  w-12 h-12
                  rounded-full
                  bg-[#1ed760]/15
                  flex items-center justify-center
                  mb-4
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6"
                >
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="#1ed760"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h1
                id="create-playlist-title"
                className="font-extrabold text-2xl max-sm:text-lg leading-tight text-white"
              >
                Your music,
                <br />
                your playlist
              </h1>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canCreate) handleCreatePlaylist()
                  if (e.key === 'Escape') close()
                }}
                autoFocus
                type="text"
                placeholder="Enter your title"
                className="
                  mt-6 max-sm:mt-4
                  w-full
                  bg-[#1a1a1a]
                  border border-[#3a3a3a]
                  focus:border-[#1ed760]
                  outline-none
                  text-sm max-sm:text-xs
                  text-white
                  placeholder:text-gray-500
                  py-2.5 max-sm:py-2
                  px-4
                  rounded-full
                  transition-colors duration-150
                "
              />

              <div className="mt-7 max-sm:mt-5 flex w-full justify-end gap-2 text-sm font-semibold">
                <button
                  onClick={close}
                  className="
                    cursor-pointer
                    rounded-full
                    px-4 py-1.5
                    text-gray-300
                    hover:text-white
                    hover:bg-white/10
                    transition-colors duration-150
                    max-sm:text-xs
                  "
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePlaylist}
                  disabled={!canCreate}
                  className="
                    cursor-pointer
                    rounded-full
                    px-4 py-1.5
                    bg-[#1ed760]
                    text-black
                    hover:bg-[#22e065]
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    disabled:hover:bg-[#1ed760]
                    transition-colors duration-150
                    max-sm:text-xs
                  "
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo(CreatePlaylist)