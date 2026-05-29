import React, { useContext } from 'react'
import { RiChromeLine, RiHome4Fill, RiHome5Line, RiPauseFill, RiPlayFill, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import { Link, Outlet } from 'react-router-dom'
import Logout from './Logout'
import Left from './2side/Left'
import Right from './2side/Right'
import { authProvider } from '../contextapi/AuthContext'
import AddToPlaylist from '../../like/AddToPlaylist'
import AlbumToPlaylist from '../../like/AlbumToPlaylist'
import SureForLogOut from '../login/SureForLogOut'
import UserProfile from '../login/UserProfile'
import UpdateProfile from '../login/UpdateProfile'
import Footer from './2side/Footer'
import Nav from './2side/Nav'


function Home() {

  let { hideplay, setHidePlay, handleCreatePlaylist, name, setName, detailData } = useContext(authProvider)
 
  return (
    <div className='w-full relative '>
      <SureForLogOut />
      <AddToPlaylist />
      <UpdateProfile />
      {
        detailData.album?.map((elem) =>

          <AlbumToPlaylist elem={elem} />
        )
      }
      {
        hideplay && (
          <>
            <div onClick={() => { setHidePlay(false) }} className='inset-0 cursor-pointer absolute bg-black/50 backdrop:backdrop-blur-sm z-10'></div>
            <div className='flex top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 items-center justify-center  absolute z-12'>
              <div className=' w-70  rounded-lg bg-[#353434] flex items-center text-center  pt-5 px-4 flex-col'>
                <h1 className='font-extrabold text-3xl mb-4'>Your Music, <br /> Your Playlist </h1>
                <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Enter your title' className='mt-6 border border-[#797777] text-sm py-2 px-4 rounded-full w-full ' />
                <div className='py-3  flex w-full  justify-end gap-2 text-sm font-semibold pt-8 '>
                  <button onClick={handleCreatePlaylist} className='border border-[#797777] cursor-pointer rounded-full px-3 py-1'>Create</button>
                  <button onClick={() => { setHidePlay(false) }} className='border border-[#797777] cursor-pointer rounded-full px-3 py-1'>Cancel</button>
                </div>
              </div>
            </div>
          </>
        )
      }

      <Nav />
      
      <div className='flex relative px-2 gap-3 justify-between w-full'>
        <Left />
        <Right />
      </div>
      <footer>
     <Footer />
      </footer>
    </div>
  )
}

export default Home