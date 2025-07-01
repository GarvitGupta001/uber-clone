import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserHome from './pages/UserHome'
import UserRiding from './pages/UserRiding'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/user-login' element={<UserLogin />} />
          <Route path='/user-signup' element={<UserSignup />} />
          <Route path='/captain-login' element={<CaptainLogin />} />
          <Route path='/captain-signup' element={<CaptainSignup />} />
          <Route path='/user-home' element={
            <UserProtectWrapper>
              <UserHome />
            </UserProtectWrapper>
          } />
          <Route path='/user-riding' element={
            <UserProtectWrapper>
              <UserRiding />
            </UserProtectWrapper>
          } />
          <Route path='/user-logout' element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          } />
          <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          } />
          <Route path='/captain-logout' element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App