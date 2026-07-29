import React, { useContext } from 'react'
import { RiChromeLine, RiHome4Fill, RiHome5Line, RiPauseFill, RiPlayFill, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import { Link, Outlet } from 'react-router-dom'
import Logout from '../component/home/Logout'
import Left from './leftSide/Left'
import Right from './rightSide/Right'
import AddToPlaylist from '../modals/AddToPlaylist'
import AlbumToPlaylist from '../like/AlbumToPlaylist'
import SureForLogOut from '../modals/SureForLogOut'
import UserProfile from './UserProfile'
import UpdateProfile from '../modals/UpdateProfile'
import Footer from '../component/home/2side/Footer'
import Nav from '../component/home/2side/Nav'
import CreatePlaylist from '../modals/CreatePlaylist'
import SearchBar from '../component/library/SearchBar'
import { authPlaylist } from '../contextapi/PlaylistContext'
import PlaylistForm from '../modals/PlaylistForm'
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

       {/* Search Bar  */}
      <SearchBar />

       {/* Playlist Update data  */}
      <PlaylistForm />

       {/* User can request for artist */}
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