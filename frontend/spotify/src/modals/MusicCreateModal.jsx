import React, { useContext } from 'react'
import { X, Music } from 'lucide-react'
import { CreateSongContext } from '../contextapi/ArtistMusicContext'
import { RiLoader4Fill } from '@remixicon/react'

const MusicCreateModal = () => {
    const { musicCreateModal, setMusicCreateModal, setSongTitle, setSonguri, songTitle, createSong, buttonLoader } = useContext(CreateSongContext)

    return (
        <>
            {
                musicCreateModal && (
                    <>
                        {/* Overlay */}
                        <div
                            className={`fixed inset-0 z-299 ${buttonLoader ? 'bg-black/80 cursor-not-allowed' : 'bg-black/60 cursor-pointer'}`}
                            onClick={() => {
                                if (!buttonLoader) {
                                    setMusicCreateModal(false)
                                }
                            }}
                        />

                        {/* Modal */}
                        <div className="fixed z-300 w-[calc(100%-2rem)] sm:w-full max-w-sm rounded-2xl bg-[#282828] p-4 sm:p-6 shadow-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4 sm:mb-6">
                                <h2 className="text-base sm:text-lg font-semibold text-white">Upload Song</h2>
                                <button disabled={buttonLoader}
                                    onClick={() => { setMusicCreateModal(false) }}
                                    className={`text-neutral-400 hover:text-white transition ${buttonLoader ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={createSong} className="flex flex-col gap-3 sm:gap-4">
                                {/* Song Upload */}
                                <label className="relative h-28 sm:h-36 bg-white/5 border-2 border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center hover:border-green-500 hover:bg-white/[0.07] transition cursor-pointer group">
                                    <div className='flex items-center justify-center flex-col px-2 text-center'>
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2 group-hover:scale-105 transition">
                                            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" strokeWidth={1.8} />
                                        </div>

                                        <p className="text-sm font-medium text-white">Choose Song</p>
                                        <p className="text-xs text-neutral-400">MP3, WAV up to 20MB</p>

                                    </div>

                                    <input
                                        onChange={(elem) => {
                                            let file = elem.target.files[0]
                                            setSonguri(file)
                                        }}
                                        type="file"
                                        accept="audio/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </label>

                                {/* Song Name */}
                                <input
                                    value={songTitle}
                                    onChange={(elem) => { setSongTitle(elem.target.value) }}
                                    type="text"
                                    placeholder="Song title"
                                    className="bg-white/5 border border-white/10 text-white placeholder-neutral-500 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 focus:bg-white/[0.07] transition"
                                />

                                {/* Button */}
                                {
                                    buttonLoader ?
                                        (<button disabled={buttonLoader}
                                            type="submit"
                                            className="bg-green-500 opacity-50 cursor-not-allowed text-black rounded-full py-2.5 font-semibold text-sm transition active:scale-[0.98] flex items-center justify-center w-full h-full" >
                                            <RiLoader4Fill className='rotate' />
                                        </button>) : (<button
                                            type="submit"
                                            className="bg-green-500 hover:bg-green-400 text-black rounded-full py-2.5 font-semibold text-sm transition active:scale-[0.98]" >
                                            Upload
                                        </button>)
                                }

                            </form>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default MusicCreateModal