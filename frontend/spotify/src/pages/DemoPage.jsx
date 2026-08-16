import React, { useContext, useEffect, useState } from 'react'
import DemoLeft from '../component/demopagecomponent/DemoLeft'
import DemoRight from '../component/demopagecomponent/DemoRight'
import DemoFooter from '../component/demopagecomponent/DemoFooter'
import DemoNavBar from '../component/demopagecomponent/DemoNavBar'
import DemoLoginPopup from '../modals/DemoLoginPopup'
import { demoContext } from '../contextapi/DemoContext'
import { useLocation } from 'react-router-dom'

const DemoPage = () => {
  const [showMobile, setShowMobile ] = useState(true)
  const { loginPopup, setLoginPopup} =useContext(demoContext)
  let location = useLocation()
  useEffect(()=>{
    setLoginPopup(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.pathname])
  return (
    <div className='w-full h-full text-white relative'>
      {
        loginPopup && (
          <DemoLoginPopup  />
        )
      }
        <DemoNavBar  setShowMobile={setShowMobile} />
        <div className='flex  items-center justify-center gap-2 '>
            <DemoLeft showMobile={showMobile} />
            <DemoRight />
        </div>
        <div className='w-full h-22 max-sm:h-17 bg-black'>
            <DemoFooter />
        </div>
    </div>
  )
}

export default DemoPage