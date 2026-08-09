import React, { useContext } from 'react'
import { RiMailSendLine, RiCloseLine } from '@remixicon/react'
import { resetContext } from '../../contextapi/resetPasswordContext'

const PopUpModel = () => {
  const { popup, setPopup } = useContext(resetContext)

  return (
    <>
      {popup && (
        <div  className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4'>
          
          <div className='relative w-full max-w-md rounded-2xl border border-white/10 bg-[#181818] p-8 text-center shadow-2xl'>
            
            {/* Icon */}
            <div className='mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1DB954]/15'>
              <RiMailSendLine
                size={32}
                className='text-[#1DB954]'
              />
            </div>

            {/* Heading */}
            <h2 className='text-2xl font-semibold text-white'>
              Check your email
            </h2>

            {/* Message */}
            <p className='mt-3 text-sm leading-6 text-gray-400'>
              We've sent a password reset link to your Gmail.
              Please check your inbox and follow the instructions
              to reset your password.
            </p>

            {/* Gmail hint */}
            <div className='mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3'>
              <p className='text-sm text-gray-300'>
                📩 Don't see it?
              </p>
              <p className='mt-1 text-xs text-gray-500'>
                Check your spam or junk folder.
              </p>
            </div>

            {/* Close button */}
            <button onClick={()=>{setPopup(false)}}
              className='absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-white/10 hover:text-white'
            >
              <RiCloseLine size={20} />
            </button>

            {/* Bottom button */}
            <button onClick={()=>{setPopup(false)}}
              className='mt-6 w-full rounded-xl bg-[#1DB954] py-3 text-sm font-semibold text-black transition hover:bg-[#1ed760] active:scale-[0.98]'
            >
              Got it
            </button>

          </div>
        </div>
      )}
    </>
  )
}

export default PopUpModel