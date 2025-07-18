import React, { useState, useContext } from 'react'
import LogoHeader from '../components/LogoHeader'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {
    const [userData, setUserData] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);
        if (response.status === 200) {
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            navigate("/user-home");
        }
        setUserData({ ...userData, email: "", password: "" });
    }
    return (
        <div className='h-screen flex flex-col justify-between pt-2 px-4 pb-8'>
            <div>
                <LogoHeader />
                <form action=""
                    className='flex flex-col items-center justify-start gap-4'
                    onSubmit={handleLogin}
                >
                    <input type="email"
                        required
                        placeholder='user_mail@example.com'
                        className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    <input type="password"
                        required
                        placeholder='Password'
                        className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    <button type="submit"
                        className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'>Login</button>
                </form>
                <p className='text-center'>
                    Don't have an account? <Link to="/user-signup" className='text-blue-700 active:text-violet-900'>Sign up</Link>
                </p>
            </div>
            <div className='text-center'>
                <Link to="/captain-login">
                    <button className='bg-emerald-600 active:bg-emerald-800 text-white px-4 py-2 rounded w-full inline-block'>Login as Captain</button>
                </Link>
            </div>
        </div>
    )
}

export default UserLogin