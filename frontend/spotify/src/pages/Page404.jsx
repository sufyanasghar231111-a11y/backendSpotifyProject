import React from 'react'
import { RiMusic2Fill } from '@remixicon/react'

const Page404 = () => {
    return (
        <div className="min-h-screen w-full bg-[#121212] text-white flex items-center justify-center px-6 overflow-hidden">
            <div className="text-center relative">

                <RiMusic2Fill
                    size={28}
                    className="absolute -top-10 max-sm:-top-4 left-8 text-[#1ed760] opacity-70 animate-bounce"
                />

                <RiMusic2Fill
                    size={20}
                    className="absolute top-10 max-sm:-right-3 -right-8 text-[#1ed760] opacity-80 animate-pulse"
                />

                <div className="relative">
                    <h1 className="text-[100px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-[-10px]">
                        404
                    </h1>

                    <div className="flex justify-center items-end gap-1.5 h-8 mt-2">
                        <span className="w-1.5 h-4 bg-[#1ed760] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
                        <span className="w-1.5 h-7 bg-[#1ed760] rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                        <span className="w-1.5 h-5 bg-[#1ed760] rounded-full animate-[pulse_0.9s_ease-in-out_infinite]" />
                        <span className="w-1.5 h-8 bg-[#1ed760] rounded-full animate-[pulse_0.7s_ease-in-out_infinite]" />
                        <span className="w-1.5 h-4 bg-[#1ed760] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mt-8">
                    Looks like this track is missing
                </h2>

                <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-md mx-auto">
                    We couldn't find the page you're looking for.
                    It may have been removed or the link might be broken.
                </p>

                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-[#292929]">
                    <span className="w-2 h-2 rounded-full bg-[#1ed760] animate-pulse" />
                    <span className="text-xs text-gray-400">
                        Nothing playing here...
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Page404

