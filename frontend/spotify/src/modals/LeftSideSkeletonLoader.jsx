import React from 'react'

const LeftSideSkeletonLoader = () => {
    return (
        <div className="w-full absolute z-300 max-w-[400px] bg-[#131314] text-white p-5 overflow-hidden">

            {/* header */}
            <div className="flex items-center justify-between mb-5">
                <div className="w-[90px] h-4 rounded bg-[#262628] animate-pulse" />
                <div className="w-[76px] h-8 rounded-full bg-[#262628] animate-pulse" />
            </div>

            {/* filter pill */}
            <div className="w-[70px] h-8 rounded-full bg-[#262628] animate-pulse mb-5" />

            {/* liked songs row */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded bg-[#262628] animate-pulse flex-shrink-0" />
                <div className="flex-1">
                    <div className="w-[110px] h-3.5 rounded bg-[#262628] animate-pulse mb-2" />
                    <div className="w-[90px] h-3 rounded bg-[#262628] animate-pulse opacity-70" />
                </div>
            </div>

            {/* playlist list */}
            <div className="relative bg-[#1c1c1e] rounded-lg p-3 py-5">
                <div className="max-h-[280px] overflow-y-auto pr-2 space-y-4 scrollbar-none">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded bg-[#262628] animate-pulse flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="w-[55%] h-3.5 rounded bg-[#262628] animate-pulse mb-2" />
                                <div className="w-[70%] h-3 rounded bg-[#262628] animate-pulse opacity-70" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* fake thin scrollbar track, purely decorative */}
                <div className="absolute right-1 top-2 bottom-2 w-1 rounded-full bg-[#333335]" />
            </div>

        </div>
    )
}

export default LeftSideSkeletonLoader