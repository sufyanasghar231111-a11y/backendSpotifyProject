import React, { useContext } from 'react'
import { authHome } from '../contextapi/HomeContext'

const Skeleton = () => {
  const { skeletonLoader } = useContext(authHome)

  if (!skeletonLoader) return null

  return (
    <div className="absolute inset-0 bg-black w-full h-full z-[100]">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between px-4 py-3 rounded-lg animate-pulse"
        >
          <div className="flex items-center gap-4">
            {/* Image */}
            <div className="w-20 h-20 bg-gray-700 rounded-lg"></div>

            {/* Text */}
            <div>
              <div className="h-6 w-48 bg-gray-700 rounded"></div>
              <div className="h-4 w-24 bg-gray-700 rounded mt-3"></div>
            </div>
          </div>

          {/* Right side icon/button */}
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>
      ))}
    </div>
  )
}

export default Skeleton