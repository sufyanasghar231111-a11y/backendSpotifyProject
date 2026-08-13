import React, { useContext } from 'react'
import { notificationContext } from '../contextapi/UserRequest'
import { timeAgo } from '../utils/TimeAgo'


const NotificationDetailModal = () => {
  const { setNotificationCheck, getSingleNotification } = useContext(notificationContext)

  const isApproved = getSingleNotification?.isApproved

  return (
    <>
      {/* backdrop */}
      <div onClick={() => { setNotificationCheck(false) }} className='w-full h-full inset-0 fixed bg-black/70 z-41' />

      {/* modal panel */}
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92%] max-w-sm bg-[#121212] rounded-2xl shadow-2xl overflow-hidden border border-white/5'>
        {/* header */}
        <div className='flex items-center justify-between px-5 py-4 border-b border-white/10'>
          <h2 className='text-lg font-semibold text-white'>Notification</h2>
          <button onClick={() => { setNotificationCheck(false) }} className='text-gray-400 hover:text-white text-xl leading-none transition-colors'>
            &times;
          </button>
        </div>

        {/* body */}
        <div className='px-5 py-5'>
          {/* status badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
              isApproved ? 'bg-[#1DB954]/15 text-[#1DB954]' : 'bg-red-500/15 text-red-400'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isApproved ? 'bg-[#1DB954]' : 'bg-red-400'}`} />
            {isApproved ? 'Approved' : 'Rejected'}
          </span>

          {/* title */}
          <h3 className='text-base font-semibold text-white mt-3'>
            {getSingleNotification?.title}
          </h3>

          {/* message */}
          <p className='text-sm text-gray-400 mt-1.5 leading-relaxed'>
            {getSingleNotification?.message}
          </p>

          {/* meta */}
          <div className='flex items-center justify-between mt-4 pt-4 border-t border-white/10'>
            <span className='text-xs text-gray-500'>{getSingleNotification?.user?.username}</span>
            <span className='text-xs text-gray-500'>{timeAgo(getSingleNotification?.createdAt)}</span>
          </div>
        </div>

        {/* footer */}
        <div className='px-5 pb-5'>
          <button
            onClick={() => { setNotificationCheck(false) }}
            className='w-full text-sm font-semibold text-black bg-[#1DB954] hover:bg-[#1ed760] rounded-full py-2.5 transition-colors'
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default NotificationDetailModal