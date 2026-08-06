import React, { useContext } from 'react'
import { adminApprovalContext } from '../../contextapi/UserRequest'

const SingleRequestModal = () => {
    const {
        openSingleRequest,
        setOpenSingleRequest,
        singleRequestData
    } = useContext(adminApprovalContext)

    const statusStyles = {
        Approved: "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
        Pending: "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
        Rejected: "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30",
    }

    const statusAccent = {
        Approved: "from-emerald-500/60 via-emerald-500/10 to-transparent",
        Pending: "from-amber-500/60 via-amber-500/10 to-transparent",
        Rejected: "from-rose-500/60 via-rose-500/10 to-transparent",
    }

    const status = singleRequestData?.requestStatus
    const accent = statusAccent[status] || "from-zinc-500/40 via-zinc-500/10 to-transparent"

    return (
        <>
            {openSingleRequest && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setOpenSingleRequest(false)}
                        className="fixed inset-0 z-[400] bg-black/70 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[401] flex items-center justify-center p-4">
                        <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#141414] shadow-[0_0_60px_rgba(0,0,0,0.7)] animate-[scaleIn_0.2s_ease-out]">

                            {/* Accent line */}
                            <div className={`h-[3px] w-full bg-gradient-to-r ${accent}`} />

                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-zinc-800/80 px-6 py-5">
                                <div>
                                    <h2 className="text-xl font-semibold tracking-tight text-white">
                                        Request Details
                                    </h2>
                                    <p className="mt-1 text-sm text-zinc-500">
                                        Artist Role Request Information
                                    </p>
                                </div>

                                <button
                                    onClick={() => setOpenSingleRequest(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800/80 text-lg text-zinc-400 transition-all duration-150 hover:bg-zinc-700 hover:text-white hover:scale-105 active:scale-95"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Body */}
                            <div className="space-y-5 p-6">

                                {/* User */}
                                <div className="flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4">

                                    {singleRequestData?.user?.pfp ? (
                                        <img
                                            src={singleRequestData.user.pfp}
                                            alt=""
                                            className="h-14 w-14 rounded-full object-cover ring-2 ring-green-500/40 ring-offset-2 ring-offset-zinc-900"
                                        />
                                    ) : (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-xl font-bold text-black ring-2 ring-green-500/40 ring-offset-2 ring-offset-zinc-900">
                                            {singleRequestData?.user?.username
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-white">
                                            {singleRequestData?.user?.username}
                                        </h3>
                                        <p className="mt-0.5 break-all font-mono text-[11px] text-zinc-500">
                                            {singleRequestData?.user?._id}
                                        </p>
                                    </div>
                                </div>

                                {/* Status Cards */}
                                <div className="grid grid-cols-2 gap-3">

                                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 transition-colors hover:border-zinc-700">
                                        <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                                            Requested Role
                                        </p>
                                        <span className="mt-2.5 inline-flex rounded-full bg-green-500/15 px-3.5 py-1.5 text-sm font-semibold capitalize text-green-400 ring-1 ring-green-500/30">
                                            {singleRequestData?.requestedRole}
                                        </span>
                                    </div>

                                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 transition-colors hover:border-zinc-700">
                                        <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                                            Request Status
                                        </p>
                                        <span className={`mt-2.5 inline-flex rounded-full px-3.5 py-1.5 text-sm font-semibold ${statusStyles[status] || "bg-zinc-700/40 text-zinc-300"}`}>
                                            {status}
                                        </span>
                                    </div>

                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="mb-2.5 text-sm font-semibold text-white">
                                        Request Description
                                    </h3>
                                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 text-[14px] leading-7 text-zinc-300">
                                        {singleRequestData?.requestDescription}
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 border-t border-zinc-800/80 bg-[#101010] px-6 py-5">
                                <button
                                    onClick={() => setOpenSingleRequest(false)}
                                    className="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-150 hover:border-zinc-500 hover:bg-zinc-800 active:scale-[0.98]"
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default SingleRequestModal