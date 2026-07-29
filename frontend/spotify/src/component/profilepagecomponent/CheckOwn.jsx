import React, { useContext } from 'react'
import { ProfileContext } from '../../contextapi/AuthContext'
import { RiPencilLine } from '@remixicon/react'

const CheckOwn = ({isown,trimname,profileData}) => {
    const { setHideProfileDetail, setUpdateprofile, setPreview  } = useContext(ProfileContext)
    
  return (
    
        <div onClick={() => {
          if(isown){
             setHideProfileDetail(true)
          }
         }}>

          <div className='shadow-2xl shadow-black group  relative overflow-hidden group text-white   bg-[#2f2f2f] rounded-full w-32 h-32 flex items-center justify-center'>
            {
              isown && (
                <>
                <div className=' absolute w-full h-full inset-0  z-45 group-hover:bg-black/50 '></div>
                <div className='absolute flex items-center opacity-0 group-hover:opacity-100 justify-center flex-col z-50'>
              <RiPencilLine className='text-white  w-8 h-8  ' />
              <h1 className='font-semibold text-sm '>Choose photo</h1>
            </div>
                </>
              )
            }
            <span className='text-4xl absolute font-bold text-[#aaa]'>{trimname}</span>
            <img src={profileData?.pfp} className='w-full h-full absolute scale-105 z-20 inset-0 object-cover' />
            {
              isown && (
                <input name="profileImage" accept="image/*" onChange={(elem) => {
                  let file = elem.target.files[0]
                  setUpdateprofile(file)
                  if (file) {
                    setPreview(URL.createObjectURL(file))
                  }
                }} type="file" className='absolute inset-0 z-50  w-full h-full opacity-0 cursor-pointer' />
              )
            }

          </div>
        </div>
  )
}

export default CheckOwn