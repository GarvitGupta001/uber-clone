import React, { useContext, useState } from 'react'
import LogoHeader from '../components/LogoHeader'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [captainData, setCaptainData] = useState({ email: "", password: "" })
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData);
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            setCaptain(response.data.captain);
            navigate("/captain-home");
        }
        setCaptainData({ ...captainData, email: "", password: "" });
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
                        placeholder='captain_mail@example.com'
                        className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                        value={captainData.email}
                        onChange={(e) => setCaptainData({ ...captainData, email: e.target.value })} />
                    <input type="password"
                        required
                        placeholder='Password'
                        className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                        value={captainData.password}
                        onChange={(e) => setCaptainData({ ...captainData, password: e.target.value })} />
                    <button type="submit"
                        className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'
                        >Login</button>
                </form>
                <p className='text-center'>
                    Wanna join fleet? <Link to="/captain-signup" className='text-blue-700 active:text-violet-900' disabled>Click Here</Link>
                </p>
            </div>
            <div className='text-center'>
                <Link to="/user-login">
                    <button className='bg-yellow-600 active:bg-yellow-800 text-white px-4 py-2 rounded w-full inline-block'>Login as User</button>
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin