import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import whyDidYouRender from '@welldone-software/why-did-you-render'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './component/contextapi/AuthContext.jsx'
import HomeContext from './component/contextapi/HomeContext.jsx'
import AudioControl from './component/contextapi/AudioControl.jsx'


if (import.meta.env.DEV) {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  })
}


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <AuthContext >
        <HomeContext >
          <AudioControl >
              <App />
          </AudioControl>
        </HomeContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
