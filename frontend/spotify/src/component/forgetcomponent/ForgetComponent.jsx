import React, { useContext } from 'react'
import { resetContext } from '../../contextapi/ResetPasswordContext'
import { RiLoader4Line, RiSpotifyFill } from '@remixicon/react'
const ForgetComponent = () => {
    const {resetEmail,setResetEmail,checkEmail,resetLoading}=useContext(resetContext)
  return (
    <div className='flex px-4 pt-16 sm:pt-24 md:pt-30 justify-center'>
            <div className='w-full max-w-sm text-center'>
                <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-10 h-10 sm:w-14 sm:h-14' /></h1>
                <h1 className='py-3 font-bold text-2xl sm:text-3xl md:text-4xl'>Forget Password</h1>
                <form onSubmit={checkEmail} className='flex  flex-col '>
                    <h1 className='pb-2 font-semibold text-start'>Email</h1>
                    <input name='email' type="text" value={resetEmail} onChange={(elem)=>{setResetEmail(elem.target.value)}}  className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' placeholder='Enter your Email'   />
                    
                    {
                        resetLoading ? (<button type='submit'  className='w-full bg-[#2beb6e] rounded-full py-3 flex items-center justify-center cursor-pointer hover:scale-101 font-bold text-black'><RiLoader4Line className='rotate' /></button>):
                        (<button type='submit'  className='w-full bg-[#2beb6e] rounded-full py-3 flex items-center justify-center cursor-pointer hover:scale-101 font-bold text-black'>Continue</button>)
                    }
                
                </form>
            </div>
            </div>
  )
}

export default ForgetComponent