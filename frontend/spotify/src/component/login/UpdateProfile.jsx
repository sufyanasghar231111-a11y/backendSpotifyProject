import { RiCloseLine, RiUserLine } from '@remixicon/react'
import React, { useContext } from 'react'
// import { authControl } from '../contextapi/AudioControl'
import { authProvider } from '../contextapi/AuthContext'

const UpdateProfile = () => {
    let {user,hideProfileDetail, setHideProfileDetail,setUpdatename,updatePfp, setUpdateprofile}=useContext(authProvider)
    const trimname=(user.username.trim().split(' ')[0][0] + user.username.trim().split(' ').pop()[0]).toUpperCase()
  return (
    <div>
        {
            hideProfileDetail && (
                <>
                 <div onClick={()=>{setHideProfileDetail(false)}} className=' absolute w-full h-full inset-0 bg-black/50 z-100 cursor-pointer'></div>
      <div className='w-125  bg-[#282828] rounded-lg  absolute top-1/2 left-1/2 z-101 -translate-x-1/2 -translate-y-1/2'>
      <div className='flex items-center justify-between px-5 py-4'>
        <h1 className='text-2xl font-bold'>Profile details</h1>
        <div onClick={()=>{setHideProfileDetail(false)}} className='px-1.5 py-1.5 rounded-full hover:bg-[#3E3E3E]'>
        <h1><RiCloseLine className='w-5 h-5 text-[#9c9a9a]' /></h1>
        </div>
      </div>
      <form onSubmit={updatePfp} className='flex items-center justify-between  px-4  pt-10 py-4'>
        <div className='ml-13 w-32 h-32 rounded-full overflow-hidden relative pt-4'>
            <RiUserLine className='w-20  absolute h-20 text-[#7F7F7F]' />
            <span className='text-4xl absolute font-bold text-[#aaa]'>{trimname}</span>
          <img src={user.pfp} className='w-full h-full absolute scale-105 z-20 inset-0 object-cover' />
          <input  name="profileImage" accept="image/*"  onChange={(elem)=>{
            let file=elem.target.files[0]
            setUpdateprofile(file)
          }} type="file" className='absolute inset-0 z-50  w-full h-full opacity-0 cursor-pointer' />
          
        </div>
        <div className='flex flex-col items-end'>
            <input value={user.username} onChange={(elem)=>{setUpdatename(elem.target.value)}} type="text" className='outline-0 font-bold text-sm w-60 bg-[#3E3E3E] mb-6 py-2 rounded px-3' />
            <button className='rounded-full px-4 py-1.5 text-sm bg-white  text-black font-bold'>Save</button>
        </div>
      </form>
      <div className='pt-8 pb-4 px-5'>
        <h1 className='text-[12px] font-semibold'>By proceeding, you agree to give Spotify access to the image you choose to upload. <br /> Please make sure you have the right to upload the image.</h1>
      </div>
      </div>
                </>
            )
        }
     
    </div>
  )
}

export default UpdateProfile
