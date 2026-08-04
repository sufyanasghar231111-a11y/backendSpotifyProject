import React, { useContext } from 'react'
import { requestContext } from '../../contextapi/UserRequest'
import { adminUiContext } from '../../contextapi/AdminContext'

const AdminNotificationModal = () => {
    const { getRequests } = useContext(requestContext)
    const { adminNotification } = useContext(adminUiContext)
    return (
        <>


            <div
                className={`absolute w-60 top-8 -left-54 rounded-lg border border-zinc-800
  bg-[#141414] shadow-xl transition-all duration-300 ease-in-out z-50
  ${adminNotification
                        ? "opacity-100 translate-y-0 max-h-80  p-1 pointer-events-auto overflow-y-auto"
                        : "opacity-0 -translate-y-2 max-h-0 overflow-hidden p-0 pointer-events-none"
                    }`}
            >
                {getRequests
                    ?.filter((item) => item.requestStatus === "Pending")
                    .map((item) => (
                        <div
                            key={item._id}
                            className="flex gap-3 p-3 border-b border-zinc-800 hover:bg-[#1d1d1d] transition cursor-pointer"
                        >
                            {/* Profile */}
                            <img
                                src={
                                    item.user.pfp ||
                                    "https://ui-avatars.com/api/?name=" + item.user.username
                                }
                                alt={item.user.username}
                                className="w-10 h-10 rounded-full object-cover bg-zinc-700"
                            />

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-white truncate">
                                        {item.user.username}
                                    </h3>

                                    <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                                        Pending
                                    </span>
                                </div>

                                <p className="text-xs text-zinc-400 truncate">
                                    {item.user.email}
                                </p>

                                <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                                    {item.requestDescription}
                                </p>

                                <p className="text-[10px] text-zinc-500 mt-2">
                                    Wants to become an <span className="text-green-400">Artist</span>
                                </p>
                            </div>
                        </div>
                    ))}

                {getRequests?.filter((item) => item.requestStatus === "Pending").length ===
                    0 && (
                        <div className="py-6 text-center text-zinc-500 text-sm">
                            No pending requests
                        </div>
                    )}
            </div>


        </>
    )
}

export default AdminNotificationModal