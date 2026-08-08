import React, { useContext } from 'react'
import { adminApprovalContext, requestContext } from '../../../contextapi/UserRequest'
import { timeAgo } from '../../../utils/TimeAgo'
import { RiCheckFill, RiCloseFill } from '@remixicon/react'
import { Link } from 'react-router-dom'


const UserRequsertToAdmin = () => {
  const { getRequests } = useContext(requestContext)
  const { updateRequest, deleteRequests } = useContext(adminApprovalContext)

  return (
    <div className="w-full px-3 sm:px-5 md:px-7 py-4 bg-[#121212]">
      <div className="w-full bg-[#141414] p-3.5 sm:p-5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        <h1 className="text-white font-semibold text-lg mb-4">
          Recent Users Requests
        </h1>

        {/* Table header - desktop/tablet only */}
        <div className="hidden md:grid grid-cols-[1.6fr_1.2fr_1.2fr_0.9fr_1.4fr] gap-4 px-2 pb-2 border-b border-white/10">
          <span className="text-xs font-medium text-gray-400">Users</span>
          <span className="text-xs font-medium text-gray-400">Username</span>
          <span className="text-xs font-medium text-gray-400">Request Date</span>
          <span className="text-xs font-medium text-gray-400">Status</span>
          <span className="text-xs font-medium text-gray-400">Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-white/5">
          {getRequests.map((req) => {
            const user = req.user.username.trim()
            const extractName = ((user.split(' ')[0][0] + user.split(' ').pop()[0]).toUpperCase())

            const avatar = (
              <div className="w-9 h-9 sm:w-8 sm:h-8 relative rounded-full overflow-hidden shrink-0">
                <div className="absolute z-[9] w-full h-full bg-green-600 text-black flex items-center justify-center text-sm font-bold">
                  {extractName}
                </div>
                {req.user.pfp && (
                  <img
                    src={req.user.pfp}
                    alt={req.user.username}
                    className="w-full h-full absolute z-10 object-cover"
                  />
                )}
              </div>
            )

            const statusBadge = req.requestStatus === 'Approved' ? (
              <span className="inline-block text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-md">
                Approved
              </span>
            ) : (
              <span className="inline-block text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-md">
                Pending
              </span>
            )

            const actions = req.requestStatus === 'Approved' ? (
              <div className="flex items-center justify-center px-1.5 py-1.5 rounded-full bg-green-500 hover:bg-green-600 shrink-0">
                <RiCheckFill className="w-5 h-5" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { updateRequest(req?._id) }}
                  className="text-xs font-medium text-white bg-green-600 hover:bg-green-700 transition-colors px-4 py-1.5 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => { deleteRequests(req?._id) }}
                  className="text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors px-4 py-1.5 rounded-md"
                >
                  Reject
                </button>
              </div>
            )

            return (
              <div key={req._id} className="py-3 md:py-2">
                {/* Mobile / tablet card layout */}
                <div className="flex flex-col gap-3 md:hidden">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {avatar}
                      <div className="min-w-0">
                        <p className="text-sm text-white truncate">{req.user.username}</p>
                        <p className="text-xs text-gray-400 truncate">@{req.user.username}</p>
                      </div>
                    </div>
                    {statusBadge}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="lg:text-xs max-sm:text-xs text-xs md:text-[8px] text-gray-400">{timeAgo(req.createdAt)}</span>
                    {actions}
                  </div>
                </div>

                {/* Desktop grid layout */}
                <div className="hidden md:grid grid-cols-[1.6fr_1.2fr_1.2fr_0.9fr_1.4fr] gap-4 items-center px-2">
                  <div className="flex items-center gap-3 min-w-0">
                    {avatar}
                    <span className="text-sm text-white truncate">{req.user.username}</span>
                  </div>

                  <span className="text-sm text-gray-400 truncate">@{req.user.username}</span>

                  <span className="text-sm text-gray-400">{timeAgo(req.createdAt)}</span>

                  <span>{statusBadge}</span>

                  <div className="flex items-center justify-center">
                    {actions}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer link */}
        <Link to="/admin/notifications">
          <div className="pt-4 text-center">
            <button className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors inline-flex items-center gap-1">
              View All Requests
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default UserRequsertToAdmin