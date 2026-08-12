import React from 'react'

const FooterSkeletonLoader = () => {
  return (
    <div className='absolute w-full h-full flex bg-[#131314] items-center justify-center z-300 px-4'>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-30 w-full max-w-3xl">

            {/* left: track info */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-[#262628] animate-pulse flex-shrink-0" />
                <div>
                    <div className="w-[90px] sm:w-[110px] h-3.5 rounded bg-[#262628] animate-pulse mb-2" />
                    <div className="w-[70px] sm:w-[80px] h-3 rounded bg-[#262628] animate-pulse opacity-70" />
                </div>
            </div>

            {/* center: controls + progress */}
            <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-4 h-4 rounded bg-[#262628] animate-pulse" />
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-4 h-4 rounded bg-[#262628] animate-pulse" />
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full">
                    <div className="w-8 h-3 rounded bg-[#262628] animate-pulse opacity-70 flex-shrink-0" />
                    <div className="w-[160px] sm:w-[200px] md:w-[260px] h-1 rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-8 h-3 rounded bg-[#262628] animate-pulse opacity-70 flex-shrink-0" />
                </div>
            </div>

        </div>
    </div>
  )
}

export default FooterSkeletonLoader