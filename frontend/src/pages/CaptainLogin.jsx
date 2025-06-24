import React, { useState } from 'react'
import LogoHeader from '../components/LogoHeader'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [captain, setCaptain] = useState({ email: "", password: "" })

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(captain);
        setCaptain({ ...captain, email: "", password: "" });
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
                        value={captain.email}
                        onChange={(e) => setCaptain({ ...captain, email: e.target.value })} />
                    <input type="password"
                        required
                        placeholder='Password'
                        className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                        value={captain.password}
                        onChange={(e) => setCaptain({ ...captain, password: e.target.value })} />
                    <button type="submit"
                        className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'
                        >Login</button>
                </form>
                <p className='text-center'>
                    Wanna join fleet? <Link to="/captain-signup" className='text-blue-700 active:text-violet-900' disabled>Click Here</Link>
                </p>
            </div>
            <div className='text-center'>
                <Link to="/login">
                    <button className='bg-yellow-600 active:bg-yellow-800 text-white px-4 py-2 rounded w-full inline-block'>Login as User</button>
                </Link>
            </div>
        </div>
    )
}

export default CaptainLogin