import React, { useContext } from 'react'
import { authSearch } from '../../contextapi/RecentSearchRoute'

const Skeleton = () => {
  const { skeletonLoader } = useContext(authSearch)

  if (!skeletonLoader) return null

  

  return (
    <div className=" absolute inset-0 h-screen overflow-hidden bg-[#282828] z-[100] p-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between px-4 py-3 rounded-lg animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-[#505050] rounded-lg"></div>

            <div>
              <div className="h-6 w-48 bg-[#505050] rounded"></div>
              <div className="h-4 w-24 bg-[#505050] rounded mt-3"></div>
            </div>
          </div>

          <div className="w-8 h-8 bg-[#505050] rounded-full"></div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton