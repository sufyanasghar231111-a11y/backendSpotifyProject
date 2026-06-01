import React, { useContext } from 'react'

import { authProvider } from '../../contextapi/AuthContext'
import FooterController from './FooterController'

function Footer() {
    
      let {hideControl } = useContext(authProvider)
      
  return (
    <div className=' '>
         <div className='flex items-center justify-center '>
        {
          hideControl ? (
            <div className='flex items-center gap-1 pt-8'>
              <h1 className='text-xs font-mono text-gray-400 w-12 text-right select-none'>00:00</h1>
              <input type="range" disabled className="cursor-not-allowed opacity-50 h-1.5 bg-gray-700 rounded-lg appearance-none " />
              <h1 className='text-xs font-mono text-gray-400 w-12 text-right select-none'>00:00</h1>

            </div>
          ) : (
            <FooterController />
          )
        }
      </div>
    </div>
  )
}

export default Footer