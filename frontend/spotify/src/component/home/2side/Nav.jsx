import React, { useContext } from 'react'
import { RiChromeLine, RiHome4Fill, RiHome5Line, RiPauseFill, RiPlayFill, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import { authHome } from '../../contextapi/HomeContext'
import { authProvider } from '../../contextapi/AuthContext'
import Logout from '../Logout'
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
    let { user,setHideSearch} = useContext(authProvider)
      let { setHidepro,searchinput,setSearchinput ,setSkeletonLoader} = useContext(authHome)
      let navigate=useNavigate()
     
      let fetchname = (user.username.trim().split(' ')[0][0] + user.username.trim().split(' ').pop()[0]).toUpperCase()
      function handleSubmit(e) {
  e.preventDefault();

  const query = searchinput.trim();
  if (!query) return;

  setSkeletonLoader(true);
  setHideSearch(false);
  setSearchinput('');
  navigate(`/searchmusic/${query}`);

  setTimeout(() => {
    setSkeletonLoader(false);
  }, 1500);
}


  return (
        <nav  className='flex lg:px-10 px-5 md:px-7 max-sm:px-3.5  py-2  relative items-center z-150 justify-between gap-2 max-sm:gap-1'>
        <div className='flex items-center gap-6 max-sm:gap-2'>
          <RiSpotifyFill className='w-10 max-sm:w-6 max-sm:h-6 h-10' />
          <div className='flex  items-center gap-4 max-sm:gap-2'>
            <Link to='/' className='px-2 py-2 max-sm:px-1 max-sm:py-1 rounded-full bg-[#282828]'><RiHome4Fill className='lg:w-8 md:w-6 w-5 h-5 lg:h-8 md:h-6 max-sm:w-5 max-sm:h-5 text-white' /></Link>
            <div onClick={()=>{setHideSearch(true)}} className='w-100 max-sm:w-50 hover:bg-[#292929] transition-all duration-200  hover:border-white/10 border border-[#282828]  flex bg-[#282828] items-center gap-2 max-sm:gap-1 px-2.5 max-sm:px-1 max-sm:py-1  rounded-full'>
              <div onClick={()=>{setHideSearch(true)}}>
                <RiSearchLine className='text-[#898881] cursor-pointer hover:scale-105 transition-all duration-300 hover:text-[#dbd9d9] max-sm:w-4 max-sm:h-4' />
              </div>
              <form onSubmit={handleSubmit} className='w-full'>
              <input  type="text" value={searchinput} onChange={(elem)=>{setSearchinput(elem.target.value)}} className='outline-0 rounded-full max-sm:text-sm w-full px-1.5 py-3 ' placeholder='What you want to play? ' />
              </form>
              <div className='border-l  px-2 border-[#706e6e]'>
                <RiChromeLine className='text-[#898881] max-sm:w-4 max-sm:h-4' />
              </div>
            </div>
           
          </div>
        </div>
        <div onClick={() => { setHidepro(prev => !prev) }} className=' bg-red-400 overflow-hidden  flex items-center justify-center relative cursor-pointer  font-semibold rounded-full max-sm:w-5 max-sm:text-[9px] max-sm:h-5 w-9 h-9'>
          <span className='absolute z-0 text-white   '>
            {fetchname}
          </span>
          {user?.pfp && 
          (
            <img src={user?.pfp} className='absolute inset-0 w-full h-full scale-110  object-cover z-10' alt="" />
          )
          }

        </div>
        <Logout />
      </nav>
  )
}

export default Nav