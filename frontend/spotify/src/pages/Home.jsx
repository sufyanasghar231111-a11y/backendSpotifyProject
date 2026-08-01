import React, { useContext } from 'react'
import { RiChromeLine, RiHome4Fill, RiHome5Line, RiPauseFill, RiPlayFill, RiSearchLine, RiSpotifyFill } from '@remixicon/react'
import { Link, Outlet } from 'react-router-dom'
import Logout from '../component/navbarcomponent/Logout'
import Left from './leftSide/Left'
import Right from './rightSide/Right'
import AddToPlaylist from '../modals/AddToPlaylist'
import AlbumToPlaylist from '../modals/AlbumToPlaylist'
import SureForLogOut from '../modals/SureForLogOut'
import UserProfile from './UserProfile'
import UpdateProfile from '../modals/UpdateProfile'
import Footer from '../component/homepagecomponent/Footer'
import Nav from '../component/navbarcomponent/Nav'
import CreatePlaylist from '../modals/CreatePlaylist'
import SearchBar from '../component/navbarcomponent/SearchBar'
import { authPlaylist } from '../contextapi/PlaylistContext'
import PlaylistForm from '../modals/PlaylistForm'
import UserRequestModal from '../modals/UserRequestModal'
import MusicEditModal from '../modals/MusicEditModal'
import AlbumEditModal from '../modals/AlbumEditModal'
import MusicCreateModal from '../modals/MusicCreateModal'
import AlbumCreateModal from '../modals/AlbumCreateModal'
import AddToAlbum from '../modals/AddToAlbum'


function Home() {

  let {  detailData } = useContext(authPlaylist)
 
  return (
    <div className='w-full relative '>
      {/* SureForLogOut */}
      <SureForLogOut />
      {/* AddToPlaylist */}
      <AddToPlaylist />

      <AddToAlbum />

      {/* updatepfp */}
      <UpdateProfile />

       {/* Search Bar  */}
      <SearchBar />

       {/* Playlist Update data  */}
      <PlaylistForm />

       {/* User can request for artist */}
      <UserRequestModal />

      <AlbumEditModal />

      <MusicCreateModal />
      
      {
        detailData.album?.map((elem) =>

          <AlbumToPlaylist elem={elem} />
        )
      }
      
      {/* CreatePlaylist */}
      <CreatePlaylist />

      <AlbumCreateModal />

      <MusicEditModal />

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