import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const logout = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    }
    useEffect(() => {

        logout();

    }, [])


    return (
        <div>UserLogout</div>
    )
}

export default UserLogout