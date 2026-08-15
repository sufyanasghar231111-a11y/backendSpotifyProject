import React, { useContext, useState } from 'react'

import { RiHeartFill, RiPauseFill, RiPlayFill } from '@remixicon/react'
import Audioplay from '../component/singlesongpagecomponent/Audioplay'
import { UIHomeContex } from '../contextapi/HomeContext'
import DetailPageSkeletonLoader from '../component/rightsidecomponents/DetailPageSkeletonLoader'
const Detail = () => {

  const { detailLoading } = useContext(UIHomeContex)
  return (
      <div className=' bg-[#1A1A1A] text-white h-[76vh]  flex max-sm:flex-col items-center justify-between px-3 py-3 relative'>
        {
          detailLoading && (
            <DetailPageSkeletonLoader />
          )
        }
        <Audioplay />
      </div>
  )
}


export default Detail
