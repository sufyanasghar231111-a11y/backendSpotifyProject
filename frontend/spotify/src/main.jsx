import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './component/contextapi/AuthContext.jsx'
import HomeContext from './component/contextapi/HomeContext.jsx'
import RecentRoute from './component/contextapi/RecentRoute.jsx'
import RecentSearchRoute from './component/contextapi/RecentSearchRoute.jsx'
import MusicControllerContext from './component/contextapi/MusicControllerContext.jsx'
import AudioProvider from './component/contextapi/AudioProvider.jsx'
import SearchSeparateContext from './component/contextapi/SearchSeparateContext.jsx'



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>

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
    </BrowserRouter>
  </StrictMode>,
)
