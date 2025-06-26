import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserLogout from './pages/UserLogout'
import UserProtectWrapper from './pages/UserProtectWrapper'

const App = () => {
  return (
    <>
        <div>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<UserLogin />} />
            <Route path='/signup' element={<UserSignup />} />
            <Route path='/captain-login' element={<CaptainLogin />} />
            <Route path='/captain-signup' element={<CaptainSignup />} />
            <Route path='/home' element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            } />
            <Route path='/user-logout' element={
              <UserProtectWrapper>
                <UserLogout />
              </UserProtectWrapper>
            } />
          </Routes>
        </div>
    </>
  )
}

export default App