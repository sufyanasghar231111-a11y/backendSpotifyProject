import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './contextapi/AuthContext.jsx'
import HomeContext from './contextapi/HomeContext.jsx'
import RecentRoute from './contextapi/RecentRoute.jsx'
import RecentSearchRoute from './contextapi/RecentSearchRoute.jsx'
import MusicControllerContext from './contextapi/MusicControllerContext.jsx'
import AudioProvider from './contextapi/AudioProvider.jsx'
import SearchSeparateContext from './contextapi/SearchSeparateContext.jsx'
import PlaylistContext from './contextapi/PlaylistContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ResetPasswordContext from './contextapi/ResetPasswordContext.jsx'
import PlaylistUpdateContext from './contextapi/PlaylistUpdateContext.jsx'
import UserRequest from './contextapi/UserRequest.jsx'
import ArtistMusicContext from './contextapi/ArtistMusicContext.jsx'
import AdminContext from './contextapi/AdminContext.jsx'
import AdminCountContext from './contextapi/AdminCountContext.jsx'
import DemoContext from './contextapi/DemoContext.jsx'
import ChatContext from './contextapi/ChatContext.jsx'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <ResetPasswordContext>
        <AdminContext>
          <AdminCountContext>
            <UserRequest >
              <ChatContext>
                <PlaylistContext >
                  <PlaylistUpdateContext>
                    <AudioProvider >
                      <MusicControllerContext >
                        <RecentRoute>
                          <RecentSearchRoute >
                            <SearchSeparateContext>
                              <AuthContext >
                                <HomeContext >
                                  <ArtistMusicContext>
                                    <DemoContext>
                                      <App />
                                    </DemoContext>
                                  </ArtistMusicContext>
                                </HomeContext>
                              </AuthContext>
                            </SearchSeparateContext>
                          </RecentSearchRoute>
                        </RecentRoute>
                      </MusicControllerContext>
                    </AudioProvider>
                  </PlaylistUpdateContext>
                </PlaylistContext>
              </ChatContext>
            </UserRequest>
          </AdminCountContext>
        </AdminContext>
      </ResetPasswordContext>
    </BrowserRouter>
  </StrictMode>
)
