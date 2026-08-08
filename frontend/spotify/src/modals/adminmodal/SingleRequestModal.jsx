import React, { useContext } from "react";
import { adminApprovalContext } from "../../contextapi/UserRequest";

const SingleRequestModal = () => {
    const {
        openSingleRequest,
        setOpenSingleRequest,
        singleRequestData,
    } = useContext(adminApprovalContext);

    const statusStyles = {
        Approved:
            "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30",
        Pending:
            "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30",
        Rejected:
            "bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30",
    };

    const statusAccent = {
        Approved:
            "from-emerald-500/60 via-emerald-500/10 to-transparent",
        Pending:
            "from-amber-500/60 via-amber-500/10 to-transparent",
        Rejected:
            "from-rose-500/60 via-rose-500/10 to-transparent",
    };

    const status = singleRequestData?.requestStatus;

    const accent =
        statusAccent[status] ||
        "from-zinc-500/40 via-zinc-500/10 to-transparent";

    return (
        <>
            {openSingleRequest && (
                <>
                    <div
                        onClick={() => setOpenSingleRequest(false)}
                        className="fixed inset-0 z-[400] bg-black/70 backdrop-blur-md"
                    />

                    <div className="fixed inset-0 z-[401] flex items-center justify-center p-3 sm:p-4">
                        <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-[#141414] shadow-[0_0_60px_rgba(0,0,0,0.7)]">

                            <div
                                className={`h-[3px] w-full bg-gradient-to-r ${accent}`}
                            />

                            <div className="flex items-start justify-between gap-4 border-b border-zinc-800/80 px-4 sm:px-6 py-4 sm:py-5">
                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                                        Request Details
                                    </h2>

                                    <p className="mt-1 text-xs sm:text-sm text-zinc-500">
                                        Artist Role Request Information
                                    </p>
                                </div>

                                <button
                                    onClick={() =>
                                        setOpenSingleRequest(false)
                                    }
                                    className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800/80 text-lg text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-4 sm:space-y-5 p-4 sm:p-6">

                                <div className="flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 sm:p-4">

                                    {singleRequestData?.user?.pfp ? (
                                        <img
                                            src={singleRequestData.user.pfp}
                                            alt={singleRequestData.user.username}
                                            className="h-11 w-11 sm:h-14 sm:w-14 shrink-0 rounded-full object-cover ring-2 ring-green-500/40 ring-offset-2 ring-offset-zinc-900"
                                        />
                                    ) : (
                                        <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-lg sm:text-xl font-bold text-black ring-2 ring-green-500/40 ring-offset-2 ring-offset-zinc-900">
                                            {singleRequestData?.user?.username
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                                            {singleRequestData?.user?.username}
                                        </h3>

                                        <p className="mt-0.5 break-all font-mono text-[9px] sm:text-[11px] text-zinc-500">
                                            {singleRequestData?.user?._id}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                    <div className="rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 sm:p-4">
                                        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                                            Requested Role
                                        </p>

                                        <span className="mt-2.5 inline-flex rounded-full bg-green-500/15 px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold capitalize text-green-400 ring-1 ring-green-500/30">
                                            {singleRequestData?.requestedRole}
                                        </span>
                                    </div>

                                    <div className="rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 sm:p-4">
                                        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-zinc-500">
                                            Request Status
                                        </p>

                                        <span
                                            className={`mt-2.5 inline-flex rounded-full px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold ${
                                                statusStyles[status] ||
                                                "bg-zinc-700/40 text-zinc-300"
                                            }`}
                                        >
                                            {status}
                                        </span>
                                    </div>

                                </div>

                                <div>
                                    <h3 className="mb-2.5 text-sm font-semibold text-white">
                                        Request Description
                                    </h3>

                                    <div className="rounded-xl sm:rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-3 sm:p-5 text-xs sm:text-[14px] leading-6 sm:leading-7 text-zinc-300 break-words">
                                        {singleRequestData?.requestDescription}
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-end border-t border-zinc-800/80 bg-[#101010] px-4 sm:px-6 py-4 sm:py-5">
                                <button
                                    onClick={() =>
                                        setOpenSingleRequest(false)
                                    }
                                    className="w-full sm:w-auto rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800"
                                >
                                    Close
                                </button>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default SingleRequestModal;