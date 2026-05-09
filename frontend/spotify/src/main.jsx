import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './component/contextapi/AuthContext.jsx'
import HomeContext from './component/contextapi/HomeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContext >
      <HomeContext >
    <App />
      </HomeContext>
    </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
