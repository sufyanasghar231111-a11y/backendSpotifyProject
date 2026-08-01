import React, { useContext } from 'react'
import { RiAlbumLine, RiCloseLine } from '@remixicon/react'
import { CreateAlbumContext } from '../contextapi/ArtistMusicContext'
import { authHome } from '../contextapi/HomeContext'

const AddToAlbum = () => {
    const { addtoAlbumModal, setAddtoAlbumModal, ownAlbum, addToAlbum } = useContext(CreateAlbumContext)
    const {data} = useContext(authHome)

    return (
        <>
            {
                addtoAlbumModal && (
                    <>
                        {/* Overlay */}
                        <div
                            className="w-full h-full absolute inset-0 z-[160] cursor-pointer bg-black/50 backdrop-blur-sm"
                            onClick={() => setAddtoAlbumModal(false)}
                        />

                        {/* Modal */}
                        <div className="absolute top-1/2 left-1/2 z-[161] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#181818] p-6 shadow-xl">

                            {/* Close */}
                            <button
                                onClick={() => setAddtoAlbumModal(false)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
                            >
                                <RiCloseLine size={22} />
                            </button>

                            {/* Header */}
                            <h2 className="text-2xl font-bold text-white">
                                Add to Album
                            </h2>

                            <p className="mt-2 text-sm text-zinc-400">
                                Select an album to add this song.
                            </p>

                            {/* Album List */}
                            <div className="mt-5 max-h-72 space-y-2 overflow-y-auto">
                                {ownAlbum?.length > 0 ? (
                                    ownAlbum.map((item) => {
                                      return     <button
                                                onClick={() => {
                                                    addToAlbum(item?._id, data?._id)
                                                }}
                                                key={item._id}
                                                className={`flex w-full items-center gap-3 rounded-lg hover:bg-[#282828] p-3 transition `}>
                                                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#333]">
                                                    <RiAlbumLine size={22} className="text-white" />
                                                </div>

                                                <div className="text-left">
                                                    <p className="font-medium text-white">
                                                        {item.title}
                                                    </p>

                                                    <p className="text-xs text-zinc-400">
                                                        {item.album.length} songs
                                                    </p>
                                                </div>
                                            </button>
                                    })
                                ) : (
                                    <p className="py-8 text-center text-zinc-500">
                                        No albums found.
                                    </p>
                                )}
                            </div>

                        </div>
                    </>
                )
            }
        </>
    )
}

export default AddToAlbum