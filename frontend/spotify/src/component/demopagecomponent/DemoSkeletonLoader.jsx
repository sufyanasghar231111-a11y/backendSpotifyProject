import React from 'react'

const DemoSkeletonLoader = () => {
    return (
        <div className="w-full absolute z-400 bg-[#131314] text-white px-10 py-7">
            <div className="max-w-[980px] mx-auto">

                {/* top pills */}
                <div className="flex gap-2.5 mb-7">
                    <div className="w-14 max-sm:h-[20px] h-[34px] rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-[120px] max-sm:h-[20px] h-[34px] rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-[120px] max-sm:h-[20px] h-[34px] rounded-full bg-[#262628] animate-pulse" />
                </div>

                {/* section 1 header */}
                <div className="w-[180px] h-3 rounded bg-[#262628] animate-pulse mb-2.5" />
                <div className="flex items-center justify-between mb-4.5">
                    <div className="w-[90px] h-[22px] rounded bg-[#262628] animate-pulse" />
                    <div className="w-14 h-3.5 rounded bg-[#262628] animate-pulse" />
                </div>

                {/* cards row */}
                <div className="relative flex gap-4">
                    <div className="absolute left-[-16px] top-1/2 max-sm:top-25 -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#8a8a8e] z-10">
                        ‹
                    </div>

                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex-1 min-w-0">
                            <div className="w-full max-sm:w-90 aspect-square rounded-[10px] bg-[#262628] animate-pulse mb-2.5" />
                            <div className="w-[70%]  h-[13px] rounded bg-[#262628] animate-pulse mb-1.5" />
                            <div className="w-[45%] h-[11px] rounded bg-[#262628] animate-pulse opacity-70" />
                        </div>
                    ))}

                    <div className="absolute right-[-16px] top-1/2 max-sm:top-25  -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-sm text-[#8a8a8e] z-10">
                        ›
                    </div>
                </div>

                <div className="h-11" />

                {/* section 2 header */}
                <div className="flex items-center justify-between mb-4.5">
                    <div className="w-[150px] h-6 rounded bg-[#262628] animate-pulse" />
                    <div className="w-14 h-3.5 rounded bg-[#262628] animate-pulse" />
                </div>

                {/* cards row 2 */}
                <div className="flex gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex-1 min-w-0">
                            <div className="w-full aspect-square rounded-[10px] bg-[#262628] animate-pulse mb-2.5" />
                            <div className="w-[70%] h-[13px] rounded bg-[#262628] animate-pulse mb-1.5" />
                            <div className="w-[45%] h-[11px] rounded bg-[#262628] animate-pulse opacity-70" />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default DemoSkeletonLoader