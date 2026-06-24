import React, { useContext } from 'react'
import { resetContext } from '../../contextapi/resetPasswordContext'
import { RiSpotifyFill } from '@remixicon/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ResetPasswordComponent = () => {
    const {password,handlePasswordChange}=useContext(resetContext)
    const {token}=useParams()
    
    async function resetpassword(e){
        e.preventDefault()
        try{
          await axios.post(`http://localhost:3000/api/reset/resetpassword/${token}`,  {password:password.confirmPassword})
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='flex pt-30 justify-center'>
            <div className='w-95 text-center'>
                <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-14 h-14' /></h1>
                <h1 className='py-3 font-bold text-4xl '>Forget Password</h1>
                <form onSubmit={resetpassword}  className='flex  flex-col '>
                    <h1 className='pb-2 font-semibold text-start'>New Password</h1>
                    <input name='newPassword' type="text" value={password.newPassword}  onChange={handlePasswordChange} className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' placeholder='Enter your Email'   />
                    <h1 className='pb-2 font-semibold text-start'>Comfirm Password</h1>
                    <input name='confirmPassword' type="text" value={password.confirmPassword} onChange={handlePasswordChange} className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' placeholder='Enter your Email'   />
                <button type='submit'  className='w-full bg-[#2beb6e] rounded-full py-3 flex items-center justify-center cursor-pointer hover:scale-101 font-bold text-black'>Submit</button>
                </form>
            </div>
            </div>
  )
}

export default ResetPasswordComponent
