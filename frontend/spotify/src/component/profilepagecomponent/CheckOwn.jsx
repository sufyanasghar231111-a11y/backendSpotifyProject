import React, { useContext } from 'react'
import { ProfileContext } from '../../contextapi/AuthContext'
import { RiPencilLine } from '@remixicon/react'

const CheckOwn = ({ isown, trimname, profileData }) => {
  const {
    setHideProfileDetail,
    setUpdateprofile,
    setPreview,
  } = useContext(ProfileContext)

  return (
    <div
      onClick={() => {
        if (isown) {
          setHideProfileDetail(true)
        }
      }}
    >
      <div className="group relative flex h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 items-center justify-center overflow-hidden rounded-full bg-[#2f2f2f] text-white shadow-2xl shadow-black">

        {/* Dark Overlay */}
        {isown && (
          <div className="absolute inset-0 z-30 bg-black/20 sm:bg-transparent sm:group-hover:bg-black/50 transition-all" />
        )}

        {/* Edit Icon */}
        {isown && (
          <div className="absolute z-40 flex flex-col items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <RiPencilLine className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
            <h1 className="text-[10px] sm:text-sm font-semibold">
              Edit
            </h1>
          </div>
        )}

        {/* Fallback Letter */}
        <span className="absolute text-2xl sm:text-3xl md:text-4xl font-bold text-[#aaa]">
          {trimname}
        </span>

        {/* Profile Image */}
        <img
          src={profileData?.pfp}
          alt=""
          className="absolute inset-0 z-20 h-full w-full scale-105 object-cover"
        />

        {/* File Input */}
        {isown && (
          <input
            name="profileImage"
            accept="image/*"
            type="file"
            className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
            onChange={(e) => {
              const file = e.target.files[0]

              setUpdateprofile(file)

              if (file) {
                setPreview(URL.createObjectURL(file))
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default CheckOwn