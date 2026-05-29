import React from 'react'

const LoadingAnimation = () => {
  return (
    <div className="h-screen overflow-hidden bg-[#0f0f0f] flex items-center justify-center relative">
        <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative z-10 flex flex-col items-center gap-6">

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500 blur-xl opacity-50 animate-ping"></div>

            <div className="w-24 h-24 rounded-full bg-[#1db954] flex items-center justify-center text-black text-4xl font-bold shadow-2xl">
              S
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-white text-2xl font-semibold tracking-wide">
              Spotify Clone
            </h1>

            <p className="text-white/50 text-sm mt-1">
              Loading your music...
            </p>
          </div>

          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-slide loader rounded-full"></div>
          </div>
        </div>
      </div>
  )
}

export default LoadingAnimation
