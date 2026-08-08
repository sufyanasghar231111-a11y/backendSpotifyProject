import { RiCloseLine, RiPencilLine, RiUserLine } from '@remixicon/react'
import React, { useContext } from 'react'
import { ProfileContext } from '../contextapi/AuthContext'
import { adminContext } from '../contextapi/AdminContext'

const UpdateProfile = () => {
  const { user } = useContext(adminContext)

  const {
    hideProfileDetail,
    setHideProfileDetail,
    updatePfp,
    setUpdateprofile,
    updatename,
    setUpdatename,
    removePfp,
    preview,
    setPreview,
    imageref,
  } = useContext(ProfileContext)

  return (
    <>
      {hideProfileDetail && (
        <>
          {/* Overlay */}
          <div
            onClick={() => {
              setHideProfileDetail(false)
              setPreview(null)
            }}
            className="fixed inset-0 z-[100] bg-black/50"
          />

          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 z-[101] w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#282828] max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-4">
              <h1 className="text-xl sm:text-2xl font-bold">
                Profile details
              </h1>

              <button
                onClick={() => {
                  setHideProfileDetail(false)
                  setPreview(null)
                }}
                className="rounded-full p-2 hover:bg-[#3E3E3E]"
              >
                <RiCloseLine className="h-5 w-5 text-[#9c9a9a]" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={updatePfp}
              className="flex flex-col sm:flex-row items-center gap-8 sm:justify-between px-4 sm:px-5 py-6"
            >
              {/* Profile Image */}
              <div className="relative group flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center overflow-hidden rounded-full">

                <div className="absolute inset-0 z-20 group-hover:bg-black/50 transition" />

                <label
                  htmlFor="photo"
                  className="absolute top-6 z-30 hidden max-sm:text-xs  max-sm:flex cursor-pointer border-b font-semibold group-hover:block"
                >
                  Choose photo
                </label>

                <RiPencilLine className="absolute top-14 max-sm:w-7 max-sm:h-7  z-30 hidden max-sm:flex h-10 w-10 sm:h-12 sm:w-12 group-hover:block" />

                <RiUserLine className="absolute h-16 w-16 sm:h-20 sm:w-20 text-[#7F7F7F]" />

                <img
                  src={preview || user?.pfp}
                  alt=""
                  className="absolute inset-0 z-10 h-full w-full scale-105 object-cover"
                />

                <input
                  ref={imageref}
                  id="photo"
                  name="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0]

                    setUpdateprofile(file)

                    if (file) {
                      setPreview(URL.createObjectURL(file))
                    }
                  }}
                />

                <h1
                  onClick={removePfp}
                  className="absolute bottom-6 z-30 hidden max-sm:flex max-sm:text-xs cursor-pointer border-b text-sm sm:text-base font-semibold group-hover:block"
                >
                  Remove photo
                </h1>
              </div>

              {/* Right Side */}
              <div className="flex w-full sm:w-auto flex-col items-stretch sm:items-end">

                <input
                  value={updatename}
                  onChange={(e) => setUpdatename(e.target.value)}
                  type="text"
                  className="mb-5 w-full sm:w-60 rounded bg-[#3E3E3E] px-3 py-2 text-sm font-bold outline-none"
                />

                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-4 sm:px-5 pb-5">
              <p className="text-[11px] sm:text-xs font-semibold leading-relaxed text-gray-300">
                By proceeding, you agree to give Spotify access to the image you
                choose to upload.
                <br />
                Please make sure you have the right to upload the image.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UpdateProfile