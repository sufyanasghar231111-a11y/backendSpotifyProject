import React, { useContext } from 'react'
import { resetContext } from '../../contextapi/resetPasswordContext'
import { RiSpotifyFill } from '@remixicon/react'
const ForgetComponent = () => {
    const {resetEmail,setResetEmail,checkEmail}=useContext(resetContext)
  return (
    <div className='flex pt-30 justify-center'>
            <div className='w-95 text-center'>
                <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-14 h-14' /></h1>
                <h1 className='py-3 font-bold text-4xl '>Forget Password</h1>
                <form onSubmit={checkEmail} className='flex  flex-col '>
                    <h1 className='pb-2 font-semibold text-start'>Email</h1>
                    <input name='email' type="text" value={resetEmail} onChange={(elem)=>{setResetEmail(elem.target.value)}}  className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' placeholder='Enter your Email'   />
                <button type='submit'  className='w-full bg-[#2beb6e] rounded-full py-3 flex items-center justify-center cursor-pointer hover:scale-101 font-bold text-black'>Continue</button>
                </form>
            </div>
            </div>
  )
}

export default ForgetComponent
