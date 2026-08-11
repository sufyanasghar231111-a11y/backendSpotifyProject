import React from 'react'

const FooterSkeletonLoader = () => {
  return (
    <div className='absolute w-full h-full flex bg-[#131314] items-center justify-center z-300'>
        <div className="flex items-center justify-center gap-30">

            {/* left: track info */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-[#262628] animate-pulse flex-shrink-0" />
                <div>
                    <div className="w-[110px] h-3.5 rounded bg-[#262628] animate-pulse mb-2" />
                    <div className="w-[80px] h-3 rounded bg-[#262628] animate-pulse opacity-70" />
                </div>
            </div>

            {/* center: controls + progress */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded bg-[#262628] animate-pulse" />
                    <div className="w-9 h-9 rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-4 h-4 rounded bg-[#262628] animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-3 rounded bg-[#262628] animate-pulse opacity-70" />
                    <div className="w-[260px] h-1 rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-8 h-3 rounded bg-[#262628] animate-pulse opacity-70" />
                </div>
            </div>

        </div>
    </div>
  )
}

export default FooterSkeletonLoader