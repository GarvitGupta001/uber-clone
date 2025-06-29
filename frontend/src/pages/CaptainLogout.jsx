import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const CaptainLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const logout = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      localStorage.removeItem("token");
      navigate("/captain-login");
    }
  }

  useEffect(() => {
    logout();
  
    return () => {
      logout();
    }
  }, [])
  
  return (
    <Loader />
  )
}

export default CaptainLogout