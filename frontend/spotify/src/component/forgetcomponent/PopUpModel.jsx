import React, { useContext } from 'react'
import { resetContext } from '../../contextapi/resetPasswordContext'

const PopUpModel = () => {
    const {popup}=useContext(resetContext)
  return (
    <div className='flex items-center justify-center'>
        {
            popup && (
                <div className='text-white text-5xl font-semibold'>
                    send to gmail check it 
                </div>
            )
        }
    </div>
  )
}

export default PopUpModel
