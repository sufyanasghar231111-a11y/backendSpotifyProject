import React from 'react'
import { User, Upload } from 'lucide-react'
import { useContext } from 'react'
import { adminContext } from '../../contextapi/AdminContext'
import UserNames from '../../utils/UserNames'
import { updateProfileContext } from '../../contextapi/AdminCountContext'
import { ProfileContext } from '../../contextapi/AuthContext'
const AdminSettingpage = () => {
  const { user } = useContext(adminContext)
  const { updateProfile, setAdminPfp, adminusername, setAdminusername, adminemail, setAdminemail, adminpfppreview, setAdminpfppreview } = useContext(updateProfileContext)
  const { removePfp } = useContext(ProfileContext)

  return (
    <div className='lg:w-[75%] w-[67%] md:w-[67%] max-sm:ml-0 md:ml-[250px] lg:ml-[260px] xl:ml-[320px]  max-sm:w-full  border-t mt-5 border-[#2e2e2e] p-6  bg-[#121212]'>
      <h1 className='text-xl font-semibold leading-5'>
        Profile <br />
        <span className='text-[12px] font-normal text-gray-400'>Manage Platform and profile</span>
      </h1>
     
      <form onSubmit={updateProfile} className="w-full">
        {/* Profile Photo */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-200 mb-3">
            Profile Photo
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Profile Image */}
            <label
              htmlFor="profilePhoto"
              className="w-24 h-24 sm:w-25 sm:h-25 group flex items-center justify-center overflow-hidden rounded-full shrink-0 relative cursor-pointer"
            >
              {/* Hover Overlay */}
              <div
                className={`w-full h-full z-40 absolute
            group-hover:flex
            ${user.pfp === "" ? "bg-black/60" : "bg-black/60"
                  }
            items-center justify-center hidden rounded-full`}
              >
                {user.pfp === "" ? (
                  <span className="text-xs sm:text-sm font-semibold">
                    Add Photo
                  </span>
                ) : (
                  <span
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      removePfp()
                    }}
                    className="text-[10px] sm:text-xs font-semibold cursor-pointer"
                  >
                    Remove Photo
                  </span>
                )}
              </div>

              {/* Default Avatar */}
              <div className="z-10 bg-green-500 absolute overflow-hidden rounded-full w-full h-full flex items-center justify-center font-semibold text-xl">
                <UserNames user={user.username} />
              </div>

              {/* Current Profile Photo */}
              {user.pfp && (
                <img
                  src={user.pfp}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover absolute z-20"
                />
              )}

              {/* Preview */}
              {adminpfppreview && (
                <img
                  src={adminpfppreview}
                  alt="Profile preview"
                  className="w-full h-full rounded-full object-cover absolute z-30"
                />
              )}

              {/* Only ONE file input */}
              <input
                id="profilePhoto"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={(elem) => {
                  const file = elem.target.files[0]

                  setAdminPfp(file)

                  if (file) {
                    setAdminpfppreview(URL.createObjectURL(file))
                  }
                }}
              />
            </label>

            {/* Photo Controls */}
            <div className="flex flex-col min-w-0">
              <label
                htmlFor="profilePhoto"
                className="inline-flex w-fit cursor-pointer items-center justify-center gap-2
          px-4 py-2 rounded-lg border border-[#3a3a3a]
          bg-[#1f1f1f] text-sm text-gray-200
          hover:bg-[#2a2a2a] transition-colors"
              >
                <Upload size={16} />

                {user.pfp === "" ? "Add Photo" : "Change Photo"}
              </label>

              <p className="text-xs text-gray-500 mt-2">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Full Name
          </label>

          <input
            id="fullName"
            type="text"
            value={adminusername}
            onChange={(elem) => {
              setAdminusername(elem.target.value)
            }}
            className="w-full bg-[#1f1f1f] border border-[#3a3a3a]
      rounded-lg px-3 sm:px-4 py-2.5
      text-sm text-white placeholder-gray-500
      focus:outline-none focus:ring-2 focus:ring-green-500/50
      focus:border-green-500"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Email Address
          </label>

          <input
            id="email"
            type="email"
            value={adminemail}
            onChange={(elem) => {
              setAdminemail(elem.target.value)
            }}
            className="w-full bg-[#1f1f1f] border border-[#3a3a3a]
      rounded-lg px-3 sm:px-4 py-2.5
      text-sm text-white placeholder-gray-500
      focus:outline-none focus:ring-2 focus:ring-green-500/50
      focus:border-green-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700
    active:bg-green-800 text-white font-medium text-sm
    rounded-lg py-3 transition-colors"
        >
          Update Profile
        </button>
      </form>
     

    </div>
  )
}

export default AdminSettingpage