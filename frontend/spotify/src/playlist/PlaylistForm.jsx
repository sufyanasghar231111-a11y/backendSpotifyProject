import React, { useContext } from 'react'
import { playlistUpdate } from '../contextapi/PlaylistUpdateContext'
import { authPlaylist } from '../contextapi/PlaylistContext'

const PlaylistForm = () => {
    const { showUpdate, setShowUpdate, playlistName,setPlaylistName,  setPlaylistPfp, updateDetail, imagePreview, setImagePreview } = useContext(playlistUpdate)
    const { separate } = useContext(authPlaylist)
    
    return (
        <div>
            {
                showUpdate && (
                    <>
                        {/* Overlay */}
                        <div
                            onClick={() => setShowUpdate(false)}
                            className="w-full h-full cursor-pointer absolute inset-0 bg-black/70 z-[200]"
                        />

                        {/* Modal */}
                        <div className="w-full h-full absolute z-[201] flex items-center justify-center">
                            <div
                                onClick={(e) => e.stopPropagation()}
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
                                <div  className="flex gap-4">
                                    {/* Playlist Image */}
                                    <div className="relative w-44 h-44 flex-shrink-0">
                                        <label
                                            htmlFor="playlistImage"
                                            className="w-full h-full rounded overflow-hidden shadow-lg cursor-pointer block group"
                                        >
                                            <img
                                                src={ imagePreview || separate?.playlistPic }
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />

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
                                                if(file){
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

                                        <button onClick={()=>{updateDetail(separate?._id)}}
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
        </div>
    )
}

export default PlaylistForm