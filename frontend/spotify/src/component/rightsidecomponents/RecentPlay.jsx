import React, { useContext } from 'react'
import { authRecent } from '../../contextapi/RecentRoute';
import { RiAlbumLine, RiCloseLine, RiMusicLine } from "@remixicon/react";
import { timeAgo } from '../../utils/TimeAgo';

const RecentPlay = () => {
  let { recentActivity, deleteData } = useContext(authRecent)

  const items = [
    ...(recentActivity?.songs?.map(i => ({
      ...i.item,
      createdAt: i.createdAt,
      type: 'songs'
    })) || []),
    ...(
      recentActivity?.album?.map(i => ({
        ...i.item,
        createdAt: i.createdAt,
        type: "album"
      }))
      || [])

  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))


  return (

    <div className="pb-5">
      <h2 className="text-xl font-bold mb-4">Recently Played</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {
          items.map((item) => {

            return <div
              key={item._id}
              className="min-w-[180px]  bg-[#181818] p-3 rounded-lg "
            >
              <div className='w-full  h-40 relative bg-gradient-to-br from-[#3c17f5] via-[#8879ff] to-[#d7fff5]'>
                <div onClick={() => { deleteData(item._id) }} className=' absolute top-3 right-3 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-[#5c5c5c]  hover:bg-[#353535] transition-all duration-150 '>
                  <RiCloseLine size={20} />
                </div>
                {
                  item.type === 'songs' ? (<div className=' z-15 absolute z-100 flex items-center justify-center w-full h-full'>
                    <RiMusicLine className='w-15 h-15' />
                  </div>) : (
                    <div className=' z-15 absolute flex items-center z-100 justify-center w-full h-full'>
                      <RiAlbumLine className='w-15 h-15' />
                    </div>
                  )
                }
                {
                  item?.image && (
                    <img
                      src={item.type === 'songs' ? (
                        item.image
                      ) : (
                        item.image
                      )
                      }
                      alt={item.title}
                      className="w-full h-full absolute z-110 object-cover "
                    />
                  )
                }
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <div>
                    <h3 className="mt-2 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {
                        item.type === 'songs' ? (
                          item.artist?.username
                        )
                          :
                          (
                            item.artistName
                          )
                      }
                    </p>
                  </div>
                </div>
                <div className='truncate text-sm'>
                  {timeAgo(item.createdAt)}
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default RecentPlay
