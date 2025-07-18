import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserContext from './context/userContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketContext from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserContext>
    <CaptainContext>
      <SocketContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContext>
    </CaptainContext>
  </UserContext>
)
