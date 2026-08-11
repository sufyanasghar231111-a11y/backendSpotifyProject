import React, { useState } from 'react'
import DemoLeft from '../component/demopagecomponent/DemoLeft'
import DemoRight from '../component/demopagecomponent/DemoRight'
import DemoFooter from '../component/demopagecomponent/DemoFooter'
import DemoNavBar from '../component/demopagecomponent/DemoNavBar'

const DemoPage = () => {
  const [showMobile, setShowMobile ] = useState(true)
  return (
    <div className='w-full h-full text-white relative'>
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