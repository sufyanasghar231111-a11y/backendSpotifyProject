import React, { useContext } from 'react'
import { authRecent } from '../../contextapi/RecentRoute'
import {
  RiAlbumLine,
  RiCloseLine,
  RiMusicLine
} from '@remixicon/react'
import { timeAgo } from '../../utils/TimeAgo'

const RecentPlay = () => {
  const { recentActivity, deleteData } = useContext(authRecent)

  const items = [
    ...(recentActivity?.songs?.map((i) => ({
      ...i.item,
      createdAt: i.createdAt,
      type: 'songs',
      recentId: i._id
    })) || []),

    ...(recentActivity?.album?.map((i) => ({
      ...i.item,
      createdAt: i.createdAt,
      type: 'album',
      recentId: i._id
    })) || [])
  ].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  if (!items.length) return null

  return (
    <section className="w-full pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">
          Recently Played
        </h2>
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item) => {
          const isAlbum = item.type === 'album'

          const username = isAlbum
            ? item.artistName
            : item.artist?.username

          return (
            <div
              key={`${item.type}-${item.recentId || item._id}`}
              className="
                group relative flex items-center
                gap-4
                min-w-0
                bg-[#181818]
                hover:bg-[#242424]
                border border-transparent
                hover:border-[#303030]
                rounded-xl
                p-3.5
                min-h-[84px]
                transition-all duration-200
                cursor-pointer
              "
            >
              {/* Image */}
              <div
                className={`
                  relative
                  flex-shrink-0
                  w-16 h-16
                  sm:w-20 sm:h-20
                  overflow-hidden
                  bg-[#252525]
                  ${isAlbum ? 'rounded-lg' : 'rounded-full'}
                `}
              >
                {/* Fallback */}
                <div
                  className="
                    absolute inset-0
                    flex items-center justify-center
                    text-gray-500
                  "
                >
                  {isAlbum ? (
                    <RiAlbumLine className="w-8 h-8" />
                  ) : (
                    <RiMusicLine className="w-8 h-8" />
                  )}
                </div>

                {/* Actual Image */}
                {item?.image && (
                  <img
                    src={item.image}
                    alt={item?.title || 'Music'}
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                      z-10
                    "
                  />
                )}
              </div>

              {/* Title + Username */}
              <div className="min-w-0 flex-1 pr-6">
                <h3
                  className="
                    text-sm sm:text-base
                    font-medium
                    text-white
                    leading-5
                    break-words
                    line-clamp-2
                  "
                  title={item?.title}
                >
                  {item?.title || 'Unknown Title'}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs sm:text-sm
                    text-gray-400
                    truncate
                    leading-4
                  "
                  title={username}
                >
                  {username || 'Unknown Artist'}
                </p>

                {/* Time (moved under artist so it's never squeezed) */}
                <span
                  className="
                    mt-1
                    block
                    text-[11px]
                    text-gray-500
                    whitespace-nowrap
                  "
                >
                  {timeAgo(item.createdAt)}
                </span>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteData(item.recentId || item._id)
                }}
                aria-label="Remove from history"
                className="
                  flex items-center justify-center
                  w-6 h-6
                  rounded-full
                  text-gray-500
                  opacity-0
                  max-sm:opacity-100
                  group-hover:opacity-100
                  hover:text-white
                  hover:bg-[#353535]
                  transition-all duration-150
                  absolute top-2 right-2
                "
              >
                <RiCloseLine size={15} />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RecentPlay