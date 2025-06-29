import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import Loader from '../components/Loader'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { setCaptain } = useContext(CaptainDataContext)

  
  useEffect(() => {
    if (!token) {
      navigate('/captain-login')
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.status === 200) {
        setCaptain(res.data.captain)
        setLoading(false)
      } else {
        navigate('/captain-login')
      }
    }).catch((error) => {
      navigate('/captain-login')
    })
  }, [token])
  
  if (loading) {
    return (
      <Loader />
    )
  }


  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectWrapper