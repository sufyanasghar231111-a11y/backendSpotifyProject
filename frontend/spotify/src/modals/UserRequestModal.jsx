import React, { useContext } from 'react'
import { requestContext } from '../contextapi/UserRequest'

const UserRequestModal = () => {

    const { requestpopup, setRequestpopup } = useContext(requestContext)
    return (
        <>
            {
                requestpopup && (
                    <>

                        <div onClick={() => { setRequestpopup(false) }} className='w-full h-full absolute z-199 inset-0 bg-black/30' />

                        <div className='w-[420px] bg-[#282828] absolute z-205 top-75 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded p-6'>
                            <h2 className="text-white text-2xl font-semibold">
                                Request Artist Role
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Tell us why you'd like to become an artist.
                            </p>

                            {/* Description */}
                            <div className="mt-6">
                                <label className="text-gray-300 text-sm mb-2 block">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Describe your music experience and why you're requesting the Artist role."
                                    rows={5}
                                    className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg p-3 text-white placeholder-gray-500 outline-none focus:border-green-500 resize-none"
                                />
                            </div>

                            {/* Role */}
                            <div className="mt-5">
                                <label className="text-gray-300 text-sm mb-2 block">
                                    Role
                                </label>

                                <select
                                    className="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg p-3 text-white outline-none focus:border-green-500"
                                >
                                    <option value="artist">Artist</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-7">
                                <button
                                    className="px-5 py-2 rounded-full bg-[#3b3b3b] hover:bg-[#4a4a4a] text-white transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    className="px-5 py-2 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold transition"
                                >
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default UserRequestModal