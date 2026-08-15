import React from 'react'

const DetailPageSkeletonLoader = () => {
    return (
        <div className="w-full absolute z-[400] bg-[#1A1A1A] text-white overflow-hidden flex max-sm:flex-col items-center justify-between px-3 py-3">

            {/* left image block */}
            <div className="relative h-[70vh] max-sm:w-full max-sm:h-[50vh] w-[60%] rounded-lg lg:rounded-2xl overflow-hidden bg-[#262628] animate-pulse" />

            {/* right side info */}
            <div className="w-[35%] max-sm:w-full max-sm:mt-6 flex flex-col gap-3 px-4">

                {/* NOW PLAYING label */}
                <div className="w-[110px] h-3 rounded bg-[#262628] animate-pulse" />

                {/* title */}
                <div className="w-[80%] h-[26px] rounded bg-[#262628] animate-pulse mt-1" />

                {/* subtitle */}
                <div className="w-[50%] h-[15px] rounded bg-[#262628] animate-pulse" />

                {/* play button */}
                <div className="w-14 h-14 rounded-full bg-[#262628] animate-pulse mt-3" />

                {/* icon row */}
                <div className="flex items-center gap-3 mt-4">
                    <div className="w-9 h-9 rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-9 h-9 rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-9 h-9 rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-9 h-9 rounded-full bg-[#262628] animate-pulse" />
                    <div className="w-9 h-9 rounded-full bg-[#262628] animate-pulse" />
                </div>

            </div>
        </div>
    )
}

export default DetailPageSkeletonLoader