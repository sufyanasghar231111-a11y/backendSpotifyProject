import React, { useContext } from 'react'
import { RiCloseLine, RiPlayFill } from '@remixicon/react'
import { demoContext } from '../contextapi/DemoContext'
import { Link } from 'react-router-dom'

const DemoLoginPopup = () => {
  const { setLoginPopup } = useContext(demoContext)

  return (
    <>
      <div
        onClick={() => setLoginPopup(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-160 cursor-pointer animate-[fadeIn_0.15s_ease-out]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-popup-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-162 w-80 max-sm:w-[85vw] animate-[popIn_0.18s_ease-out]"
      >
        <div
          className="relative rounded-2xl bg-[#282828] border border-white/10 shadow-2xl shadow-black/40 px-6 pt-7 pb-6 flex flex-col items-center text-center"
        >
          <button
            type="button"
            onClick={() => setLoginPopup(false)}
            aria-label="Close"
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-150 cursor-pointer"
          >
            <RiCloseLine size={18} />
          </button>

          <div className="w-16 h-16 rounded-full bg-[#1ed760]/15 flex items-center justify-center mb-5">
            <RiPlayFill size={28} className="text-[#1ed760]" />
          </div>

          <h1
            id="login-popup-title"
            className="font-extrabold text-2xl max-sm:text-xl leading-tight text-white whitespace-nowrap"
          >
            Start listening <br /> with  a free account
          </h1>

          <p className="mt-3 text-sm max-sm:text-xs text-gray-400 leading-5">
            Log in to play songs, save albums to your library, and build your own playlists. It's free.
          </p>

          <div className="mt-7 w-full flex flex-col gap-3">
            <Link to='/register'>
              <button
                className="w-full cursor-pointer rounded-full py-2.5 max-sm:py-2 text-sm max-sm:text-xs font-bold bg-[#1ed760] text-black hover:bg-[#22e065] hover:scale-[1.02] transition-all duration-150"
              >
                Sign up free
              </button>
            </Link>
            <Link to='/login'>
              <button
                className="w-full cursor-pointer rounded-full py-2.5 max-sm:py-2 text-sm max-sm:text-xs font-bold bg-transparent text-white border border-[#5a5a5a] hover:border-white transition-colors duration-150"
              >
                Log in
              </button>
            </Link>
          </div>

          <button
            onClick={() => setLoginPopup(false)}
            className="mt-5 text-xs text-gray-500 hover:text-gray-300 hover:underline cursor-pointer transition-colors duration-150"
          >
            Not now
          </button>
        </div>
      </div>
    </>
  )
}

export default DemoLoginPopup