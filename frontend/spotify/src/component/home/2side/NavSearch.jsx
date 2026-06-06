import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authProvider } from '../../contextapi/AuthContext'
import { authHome } from '../../contextapi/HomeContext'
import { RiChromeLine, RiCloseLargeFill, RiSearchLine } from '@remixicon/react'

const NavSearch = () => {

    let {  setHideSearch } = useContext(authProvider)
  let {  searchinput, setSearchinput, setSkeletonLoader, hideClose, setHideClose,patchText } = useContext(authHome)
  let navigate = useNavigate()
    function handleSubmit(e) {
    e.preventDefault();

    const query = searchinput.trim();
    if (!query) return;
    setSkeletonLoader(true);
    setHideSearch(false);
    patchText()
    navigate(`/searchmusic?query=${query}`);
    
    setTimeout(() => {
      setSkeletonLoader(false);
    }, 1500);
  }
    
  useEffect(()=>{

    if (searchinput.length >= 1) {
      setHideClose(true)
    }
    else {
      setHideClose(false)
    }

  },[searchinput])

  return (
    <div onClick={() => { setHideSearch(true) }} className='w-100 max-sm:w-50 hover:bg-[#292929] transition-all duration-200  hover:border-white/10 border border-[#282828]  flex bg-[#282828] items-center gap-2 max-sm:gap-1 px-2.5 max-sm:px-1 max-sm:py-1  rounded-full'>
            <div onClick={() => { setHideSearch(true) }}>
              <RiSearchLine className='text-[#898881] cursor-pointer hover:scale-105 transition-all duration-300 hover:text-[#dbd9d9] max-sm:w-4 max-sm:h-4' />
            </div>
            <form onSubmit={handleSubmit} className='w-full'>
              <input type="text" value={searchinput} onChange={(elem) => { setSearchinput(elem.target.value) }} className='outline-0 rounded-full max-sm:text-sm w-full px-1.5 py-3 ' placeholder='What you want to play? ' />
            </form>
            <div className='flex items-center gap-3'>
              {
                hideClose && (

                  <div onClick={() => {
                    setHideClose(false)
                    setSearchinput('')
                  }}>
                    <RiCloseLargeFill className='text-[#807d7d]' />
                  </div>
                )
              }
              <div className='border-l  px-2 border-[#706e6e]'>
                <RiChromeLine className='text-[#898881] max-sm:w-4 max-sm:h-4' />
              </div>
            </div>
          </div>
  )
}

export default NavSearch
