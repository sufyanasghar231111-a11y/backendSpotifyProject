import React, { useContext } from 'react'
import { notificationContext } from '../contextapi/UserRequest'

const NotificationModal = () => {
    const { notificationpopup, setNotificationpopup } = useContext(notificationContext)
    return (
        <div className={`absolute  ${notificationpopup ? ' overflow-auto opacity-100 pointer-events-auto  translate-y-0 h-80 p-1 z-40 ' : 'pointer-events-none  opacity-0 -translate-y-2  h-0 p-0 border-0 overflow-hidden '} w-60 right-26 top-14  border rounded transition-all ease duration-400 bg-zinc-900 border-zinc-700 shadow-2xl `}>
            <div className="flex gap-3 rounded-lg bg-zinc-800 p-3 hover:bg-zinc-700 transition-colors cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white text-lg">
                    ✕
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                        Artist Request Rejected
                    </h3>

                    <p className="mt-1 text-xs text-zinc-300 line-clamp-2">
                        Unfortunately, your artist request has been rejected. Please review the
                        requirements and submit a new request if eligible.
                    </p>

                    <span className="mt-2 block text-[11px] text-zinc-500">
                        Jul 24, 2026
                    </span>
                </div>

                {/* {!item.isRead && (
    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
  )} */}
            </div>
        </div>
    )
}

export default NotificationModal