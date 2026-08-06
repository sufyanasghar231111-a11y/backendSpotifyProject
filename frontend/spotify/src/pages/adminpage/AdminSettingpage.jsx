import React from 'react'
import { User, Upload } from 'lucide-react'
import { useContext } from 'react'
import { adminContext } from '../../contextapi/AdminContext'
import UserNames from '../../utils/UserNames'
const AdminSettingpage = () => {
  const { user } = useContext(adminContext)

  return (
    <div className='w-[75%] ml-84 border-t mt-5 border-[#2e2e2e] p-6 bg-[#121212]'>
      <h1 className='text-xl font-semibold leading-5'>
        Profile <br />
        <span className='text-[12px] font-normal text-gray-400'>Manage Platform and profile</span>
      </h1>

      <div className='mt-6 bg-[#181818] border border-[#2e2e2e] rounded-xl p-6'>
        <div className='flex items-center gap-2 mb-6'>
          <User size={18} className='text-gray-300' />
          <h2 className='text-base font-semibold text-white'>Admin Account</h2>
        </div>

        <div>
          <div className='mb-6'>
            <p className='text-sm font-medium text-gray-200 mb-3'>Profile Photo</p>
            <div className='flex items-center gap-4'>
              <label htmlFor='profilePhoto' className='w-20 h-20  group  flex items-center justify-center shrink-0 relative'>
                {/* {
                <div className=' absolute z-105 -top-2 w-30 text-xs bg-[#141414] group-hover:block hidden  px-3 py-2'>
                  Remove Photo
                </div>
                } */}
                <div className={`w-full h-full z-101 absolute group-hover:flex ${user.pfp === ''? 'bg-black/60':''} items-center justify-center hidden `} >
                  {user.pfp === '' && (
                    <h1 className='text-sm font-semibold'>Add Photo</h1>
                  ) 
                  }
                </div>
                <div className='z-99 bg-green-500 absolute overflow-hidden rounded-full w-full h-full flex items-center justify-center font-semibold text-xl'>
                  <UserNames user={user.username} />
                </div>
                {user.pfp && (
                  <img src={user.pfp} className='w-full h-full overflow-hidden rounded-full object-cover absolute z-100' />
                )}
                <input
                  id="profilePhoto"
                  type='file'
                  accept='image/jpeg,image/png,image/gif'
                  className='hidden'
                />
              </label>
              <div>
                <label
                  htmlFor="profilePhoto"
                  className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border border-[#3a3a3a] bg-[#1f1f1f] text-sm text-gray-200 hover:bg-[#2a2a2a] transition-colors"
                >
                  <Upload size={16} />
                  Change Photo
                </label>

                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                />
                <p className='text-xs text-gray-500 mt-2'>JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <label htmlFor='fullName' className='block text-sm font-medium text-gray-200 mb-2'>
              Full Name
            </label>
            <input
              id='fullName'
              type='text'
              className='w-full bg-[#1f1f1f] border border-[#3a3a3a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500'
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-200 mb-2'>
              Email Address
            </label>
            <input
              id='email'
              type='email'

              className='w-full bg-[#1f1f1f] border border-[#3a3a3a] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-green-600 hover:bg-green-700 text-white font-medium text-sm rounded-lg py-3 transition-colors'
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminSettingpage