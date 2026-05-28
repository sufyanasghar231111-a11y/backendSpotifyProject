import React from 'react'

import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import Input from '../../like/Input'
import Audioplay from '../play/Audioplay'
// import { authProvider } from '../contextapi/AuthContext'
const Detail = () => {



  return (
    <div className='text-white '>

      <div className=' bg-[#1A1A1A] text-white flex items-center justify-between px-3 py-5'>
        <Audioplay />
      </div>
    </div>
  )
}


export default Detail
