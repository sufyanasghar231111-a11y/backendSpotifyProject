import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './component/contextapi/AuthContext.jsx'
import HomeContext from './component/contextapi/HomeContext.jsx'
import AudioControl from './component/contextapi/AudioControl.jsx'
import PlayList from './component/contextapi/PlayList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext >
        <HomeContext >
          <AudioControl >
            <PlayList >
              <App />
            </PlayList>
          </AudioControl>
        </HomeContext>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
