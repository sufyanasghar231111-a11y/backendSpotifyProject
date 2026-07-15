import React, { useContext } from 'react'
import { playlistUpdate } from '../contextapi/PlaylistUpdateContext'
import { authPlaylist } from '../contextapi/PlaylistContext'
import { RiMoreLine, RiPlayListLine } from '@remixicon/react';

const PlaylistForm = () => {
    const { showUpdate, setShowUpdate, playlistName, setPlaylistName, setPlaylistPfp, updateDetail, imagePreview, setImagePreview, deleteShow, setDeleteShow, deleteDetail } = useContext(playlistUpdate)
    const { separate } = useContext(authPlaylist)

   

    return (
        <>
            {
                showUpdate && (
                    <>
                        {/* Overlay */}
                        <div
                            onClick={() => {
                                setShowUpdate(false)
                                setDeleteShow(false)
                            }
                            }
                            className="w-full h-full cursor-pointer absolute inset-0 bg-black/70 z-[250]"
                        />

                        {/* Modal */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[251] flex items-center justify-center">
                            <div
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setDeleteShow(false)
                                }}
                                className="bg-[#282828] w-[560px] rounded-lg p-6 text-white"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <h1 className="text-3xl font-bold">Edit details</h1>

                                    <button
                                        onClick={() => setShowUpdate(false)}
                                        className="text-gray-400 hover:text-white text-3xl leading-none"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="flex gap-4">
                                    {/* Playlist Image */}
                                    <div className="relative w-44 h-44 group flex-shrink-0">

                                        <div onClick={(e) => {
                                            setDeleteShow(prev => !prev)
                                            e.stopPropagation()
                                        }} className=' absolute  z-100 opacity-0 group-hover:opacity-100 right-1 bg-[#111111] rounded-full px-1.5 py-1.5  '>
                                            <RiMoreLine className='text-[#8b8989]' />
                                        </div>
                                        {
                                            deleteShow && (
                                                <div onClick={() => {
                                                    deleteDetail(separate?._id)
                                                     setShowUpdate(false)
                                                }} className='absolute  z-[250]  w-35 h-20 border -right-30 top-10'>
                                                    delete
                                                </div>
                                            )
                                        }
                                        <label
                                            htmlFor="playlistImage"
                                            className="w-full h-full rounded overflow-hidden shadow-lg cursor-pointer block group"
                                        >
                                            {(imagePreview || separate?.playlistPic) ? (
                                                <img
                                                    src={imagePreview || separate?.playlistPic}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            ):
                                            (
                                                <div className='flex items-center justify-center w-full h-full'>
                                                    <RiPlayListLine className='w-15 h-15 text-[#3f3c3c]' />
                                                </div>
                                            )
                                            }

                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                                <span className="text-white font-semibold">
                                                    Change photo
                                                </span>
                                            </div>
                                        </label>

                                        <input
                                            id="playlistImage"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(elem) => {
                                                let file = elem.target.files[0]
                                                setPlaylistPfp(file)
                                                if (file) {
                                                    setImagePreview(URL.createObjectURL(file))
                                                }
                                            }}
                                        />
                                    </div>
                                    {/* Right Side */}
                                    <div className="flex-1 flex flex-col">
                                        <input
                                            type="text"
                                            placeholder="Playlist name"
                                            className="bg-[#3E3E3E] rounded px-4 py-3 outline-none placeholder-gray-300"
                                            value={playlistName}
                                            onChange={(elem) => { setPlaylistName(elem.target.value) }}
                                        />

                                        <button onClick={() => { updateDetail(separate?._id) }}
                                            className="mt-auto ml-auto bg-white text-black font-semibold px-10 py-3 rounded-full hover:scale-105 transition"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>

                                {/* Bottom */}
                                <div className="mt-6">
                                    <button className="border border-gray-400 rounded-full px-5 py-2 font-semibold hover:border-white">
                                        🔒 Make private
                                    </button>

                                    <p className="text-xs text-gray-400 mt-5 leading-5">
                                        By proceeding, you agree to give Spotify access to the image you choose
                                        to upload. Please make sure you have the right to upload the image.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default PlaylistForm