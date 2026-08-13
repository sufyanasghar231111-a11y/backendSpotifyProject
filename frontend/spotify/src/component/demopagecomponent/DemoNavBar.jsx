import {
  RiChromeLine,
  RiCloseLargeFill,
  RiHome4Fill,
  RiMenu2Line,
  RiSearchLine,
  RiSpotifyFill,
} from '@remixicon/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { demoContext } from '../../contextapi/DemoContext'

const DemoNavBar = ({ setShowMobile}) => {
  const { demoInput, setDemoInput } = useContext(demoContext)

  return (
    <nav className='flex items-center justify-between gap-2 w-full px-3 sm:px-5 md:px-7 lg:px-10 py-2 relative z-[150]'>
      {/* Left section */}
      <div className='flex items-center gap-2 sm:gap-4 md:gap-6 min-w-0'>
        {/* Hamburger: only shown on small/medium screens where sidebar is hidden */}
        <button onClick={()=>{setShowMobile(prev => !prev)}} className='hidden max-lg:flex shrink-0'>
          <RiMenu2Line className='w-5 h-5' />
        </button>

        <RiSpotifyFill className='w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 shrink-0' />

        <div className='flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0'>
          <div className='p-2 rounded-full bg-[#282828] shrink-0'>
            <RiHome4Fill className='w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white' />
          </div>

          {/* Search bar: hidden on mobile, shown from sm up */}
          <div className='hidden sm:flex items-center gap-2 px-2.5 rounded-full border border-[#191919] bg-[#282828] hover:bg-[#292929] hover:border-white/10 transition-all duration-200 w-40 sm:w-48 md:w-72 lg:w-96'>
            <RiSearchLine className='text-[#898881] hover:text-[#dbd9d9] transition-all duration-300 hover:scale-105 cursor-pointer w-4 h-4 shrink-0' />
            <input onChange={(elem)=>{setDemoInput(elem.target.value)}} value={demoInput}
              type='text'
              className='outline-0 bg-transparent rounded-full w-full min-w-0 px-1.5 py-2 md:py-3 text-xs sm:text-sm'
              placeholder='What you want to play?'
            />
            <div className='hidden md:flex items-center border-l border-[#706e6e] pl-2 shrink-0'>
              <RiChromeLine className='text-[#898881] w-4 h-4' />
            </div>
          </div>

          
        </div>
      </div>

      {/* Right section */}
      <div className='flex items-center gap-2 sm:gap-3 md:gap-5 shrink-0'>
        <Link
          to='/register'
          className='px-3 sm:px-4 py-1.5 font-semibold rounded-full text-xs sm:text-sm bg-white text-black whitespace-nowrap'
        >
          Sign up
        </Link>
        <Link
          to='/login'
          className='px-3 sm:px-4 py-1.5 font-semibold rounded-full text-xs sm:text-sm bg-white text-black whitespace-nowrap'
        >
          Login
        </Link>
      </div>
    </nav>
  )
}

export default DemoNavBar