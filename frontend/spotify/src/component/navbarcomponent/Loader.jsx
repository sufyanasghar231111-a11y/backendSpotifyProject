import React from 'react'

const Loader = () => {
    return (
        <div className="absolute inset-0 z-150 bg-[#1A1A1A] p-2">
  {[1, 2, 3, 4, 5, 6].map((item) => (
    <div
      key={item}
      className="flex items-center gap-4 px-3 py-2 animate-pulse"
    >
      <div className="w-8 h-8 bg-[#505050] rounded-full"></div>

      <div className="h-3 w-24 bg-[#505050] rounded"></div>
    </div>
  ))}
</div>
    )
}

export default Loader
