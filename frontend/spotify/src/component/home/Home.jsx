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
import CreatePlaylist from '../../like/CreatePlaylist'
import SearchBar from '../library/SearchBar'


function Home() {

  let {  detailData } = useContext(authProvider)
 
  return (
    <div className='w-full relative '>
      {/* SureForLogOut */}
      <SureForLogOut />
      {/* AddToPlaylist */}
      <AddToPlaylist />
      {/* updatepfp */}
      <UpdateProfile />
      <SearchBar />

      {
        detailData.album?.map((elem) =>

          <AlbumToPlaylist elem={elem} />
        )
      }
      
      {/* CreatePlaylist */}
      <CreatePlaylist />

      {/* navbar  */}
      <Nav />
      
      <div className='flex relative px-2 gap-3 justify-between w-full'>
        <Left />
        <Right />
      </div>
      {/* footer */}
      <footer className='w-full h-22 bg-black'>

     <Footer />
     
      </footer>
    </div>
  )
}

export default Home