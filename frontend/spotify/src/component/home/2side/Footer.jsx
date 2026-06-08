import React, { useContext } from 'react'

import FooterController from './FooterController'
import { musciControl } from '../../contextapi/MusicControllerContext'

function Footer() {
    
      let {control}=useContext(musciControl)

      
      
  return (
    <div className=''>
         <div className='flex items-center justify-center '>
          {
            control.length >= 1  ? (
              <FooterController />
            ):(
               <div className='flex items-center gap-1 pt-8'>
              <h1 className='text-xs font-mono text-gray-400 w-12 text-right select-none'>00:00</h1>
              <input type="range" disabled className="cursor-not-allowed opacity-50 h-1.5 bg-gray-700 rounded-lg appearance-none " />
              <h1 className='text-xs font-mono text-gray-400 w-12 text-right select-none'>00:00</h1>
            </div>
            )
          }
            
          
      </div>
    </div>
  )
}

export default Footer