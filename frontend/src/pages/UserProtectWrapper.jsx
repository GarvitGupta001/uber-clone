import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'

const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { setUser } = useContext(UserDataContext);

    useEffect(() => {
        if (!token) {
            navigate("/user-login");
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setUser(res.data.user);
                setLoading(false);
            } else {
                navigate("/user-login");
            }
        }).catch((error) => {
            console.log(error);
            navigate("/user-login");
        });
    }, [token]);

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>{children}</div>
    )
}

export default UserProtectWrapper