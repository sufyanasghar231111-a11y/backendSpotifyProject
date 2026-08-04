import React, { useContext } from 'react'
import { adminApprovalContext, requestContext } from '../../../contextapi/UserRequest'
import { timeAgo } from '../../../utils/TimeAgo'
import { RiCheckFill, RiCloseFill } from '@remixicon/react'
import { Link } from 'react-router-dom'


const UserRequsertToAdmin = () => {
  const { getRequests } = useContext(requestContext)
  const { updateRequest, deleteRequests } = useContext(adminApprovalContext)
  return (
    <div className="w-full px-7 py-4 bg-[#121212]">
      <div className="w-full bg-[#141414] p-5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        <h1 className="text-white font-semibold text-lg mb-4">
          Recent Users Requests
        </h1>

        {/* Table header */}
        <div className="grid grid-cols-[1.6fr_1.2fr_1.2fr_0.9fr_1.4fr] gap-4 px-2 pb-2 border-b border-white/10">
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
            return <div
              key={req.user.username}
              className="grid grid-cols-[1.6fr_1.2fr_1.2fr_0.9fr_1.4fr] gap-4 items-center px-2 py-2"
            >
              <div className="flex items-center gap-3">
                <div className='w-8 h-8 relative rounded-full overflow-hidden'>
                  <div className=' absolute z-9 w-full h-full bg-green-600 text-black flex items-center justify-center text-sm font-bold'>
                    {extractName}
                  </div>
                  {
                    req.user.pfp && (
                      <img
                        src={req.user.pfp}
                        alt={req.user.username}
                        className="w-full h-full absolute z-10  object-cover"
                      />
                    )
                  }
                </div>
                <span className="text-sm text-white">{req.user.username}</span>
              </div>

              <span className="text-sm text-gray-400">@{req.user.username}</span>

              <span className="text-sm text-gray-400">{timeAgo(req.createdAt)}</span>
                  
                  {
                    req.requestStatus === 'Approved' ? (
                      <span>
                      <span className="inline-block text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-md">
                        Approved
                      </span>
                    </span>
                    ):(
                      <span>
                      <span className="inline-block text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-md">
                        Pending
                      </span>
                    </span>
                    )
                  }

              {
                req.requestStatus === 'Approved' ? (
                  <div className='flex items-center justify-center'>
                    <div className='flex items-center justify-center px-1.5 py-1.5  rounded-full bg-green-500 hover:bg-green-600'>
                    <RiCheckFill className='w-5 h-5' />
                  </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>{updateRequest(req?._id)}} className="text-xs font-medium text-white bg-green-600 hover:bg-green-700 transition-colors px-4 py-1.5 rounded-md">
                        Approve
                      </button>
                      <button onClick={()=>{deleteRequests(req?._id)}} className="text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors px-4 py-1.5 rounded-md">
                        Reject
                      </button>
                    </div>
                  </>
                )
              }
            </div>
          })}
        </div>

        {/* Footer link */}
        <Link to='/admin/notifications' >
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