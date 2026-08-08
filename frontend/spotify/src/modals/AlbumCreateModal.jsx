import React, { useContext } from 'react'
import { RiCloseLine } from '@remixicon/react'
import { CreateAlbumContext } from '../contextapi/ArtistMusicContext'

const AlbumCreateModal = () => {
    const { albumCreateModal, setAlbumCreateModal, albumTitle, setAlbumTitle, albumButtonLoader, handleCreateAlbum } = useContext(CreateAlbumContext)

    return (
        <>
            {/* Overlay */}
            {
                albumCreateModal && (
                    <>
                        <div
                            className={`fixed inset-0 z-[299] ${albumButtonLoader
                                ? 'bg-black/80 cursor-not-allowed'
                                : 'bg-black/60 cursor-pointer'
                                }`}
                            onClick={() => {
                                if (!albumButtonLoader) {
                                    setAlbumCreateModal(false)
                                }
                            }}
                        />

                        {/* Modal */}
                        <div className="fixed z-[300] top-1/2 left-1/2 w-[calc(100%-2rem)] sm:w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#181818] p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">

                            {/* Close Button */}
                            <button
                                onClick={() => !albumButtonLoader && setAlbumCreateModal(false)}
                                disabled={albumButtonLoader}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-zinc-400 transition hover:text-white"
                            >
                                <RiCloseLine size={22} className="sm:hidden" />
                                <RiCloseLine size={24} className="hidden sm:block" />
                            </button>

                            {/* Title */}
                            <h2 className="text-xl sm:text-2xl font-bold text-white pr-6">
                                Create Album
                            </h2>

                            {/* Description */}
                            <p className="mt-2 text-sm text-zinc-400">
                                Give your album a name. You can change it later if you want.
                            </p>

                            {/* Input */}
                            <div className="mt-5 sm:mt-6">
                                <label className="mb-2 block text-sm font-medium text-white">
                                    Album Title
                                </label>

                                <input
                                    type="text"
                                    value={albumTitle}
                                    onChange={(e) => setAlbumTitle(e.target.value)}
                                    placeholder="My Awesome Album"
                                    disabled={albumButtonLoader}
                                    className="w-full rounded-md border border-zinc-700 bg-[#282828] px-4 py-2.5 sm:py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-green-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                                <button
                                    onClick={() => setAlbumCreateModal(false)}
                                    disabled={albumButtonLoader}
                                    className="w-full sm:w-auto rounded-full px-5 py-2.5 sm:py-2 font-medium text-white transition hover:bg-zinc-700 max-sm:bg-zinc-700 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleCreateAlbum}
                                    disabled={albumButtonLoader || !albumTitle.trim()}
                                    className="w-full sm:w-auto rounded-full bg-green-500 px-6 py-2.5 sm:py-2 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {albumButtonLoader ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default AlbumCreateModal