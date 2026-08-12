import React, { useContext } from 'react'
import { authSearch } from '../../contextapi/RecentSearchRoute'

const Skeleton = () => {
  const { skeletonLoader } = useContext(authSearch)

  if (!skeletonLoader) return null



  return (
    <div className="absolute inset-0 h-[65vh] overflow-hidden bg-[#282828] z-[100] p-2 sm:p-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 rounded-lg animate-pulse gap-2"
        >
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#505050] rounded-lg flex-shrink-0"></div>

            <div className='min-w-0 flex-1'>
              <div className="h-4 sm:h-5 md:h-6 w-32 sm:w-40 md:w-48 max-w-full bg-[#505050] rounded"></div>
              <div className="h-3 sm:h-4 w-20 sm:w-24 bg-[#505050] rounded mt-2 sm:mt-3"></div>
            </div>
          </div>

          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#505050] rounded-full flex-shrink-0"></div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton