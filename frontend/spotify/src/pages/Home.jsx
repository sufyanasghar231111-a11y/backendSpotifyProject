import React, { useContext } from 'react'
import { RiChromeLine, RiHome4Fill, RiHome5Line, RiPauseFill, RiPlayFill, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import { Link, Outlet } from 'react-router-dom'
import Logout from '../component/home/Logout'
import Left from './leftSide/Left'
import Right from './rightSide/Right'
import AddToPlaylist from '../like/AddToPlaylist'
import AlbumToPlaylist from '../like/AlbumToPlaylist'
import SureForLogOut from '../component/login/SureForLogOut'
import UserProfile from '../component/login/UserProfile'
import UpdateProfile from '../component/login/UpdateProfile'
import Footer from '../component/home/2side/Footer'
import Nav from '../component/home/2side/Nav'
import CreatePlaylist from '../like/CreatePlaylist'
import SearchBar from '../component/library/SearchBar'
import { authPlaylist } from '../contextapi/PlaylistContext'
import PlaylistForm from '../playlist/PlaylistForm'
import UserRequestModal from '../modals/UserRequestModal'


function Home() {

  let {  detailData } = useContext(authPlaylist)
 
  return (
    <div className='w-full relative '>
      {/* SureForLogOut */}
      <SureForLogOut />
      {/* AddToPlaylist */}
      <AddToPlaylist />
      {/* updatepfp */}
      <UpdateProfile />
      
      <SearchBar />

      <PlaylistForm />

      <UserRequestModal />

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