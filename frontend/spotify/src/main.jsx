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
import ResetPasswordContext from './contextapi/resetPasswordContext.jsx'
import PlaylistUpdateContext from './contextapi/PlaylistUpdateContext.jsx'
import UserRequest from './contextapi/UserRequest.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserRequest >
        <ResetPasswordContext>
          <PlaylistContext >
        <PlaylistUpdateContext>
            <AudioProvider >
              <MusicControllerContext >
                <RecentRoute>
                  <RecentSearchRoute >
                    <SearchSeparateContext>
                      <AuthContext >
                        <HomeContext >
                          <App />
                        </HomeContext>
                      </AuthContext>
                    </SearchSeparateContext>
                  </RecentSearchRoute>
                </RecentRoute>
              </MusicControllerContext>
            </AudioProvider>
        </PlaylistUpdateContext>
          </PlaylistContext>
        </ResetPasswordContext>
        </UserRequest>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
