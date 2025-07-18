import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoHeader from '../components/LogoHeader'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullname: {
            firstname: "",
            lastname: ""
        },
        email: "",
        password: ""
    })

    const { setUser } = useContext(UserDataContext);

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData);
        if (response.status === 201) {
            setUser(response.data.user)
            localStorage.setItem("token", response.data.token);
            navigate("/user-home");
        }
        setUserData({ email: "", password: "", fullname: { firstname: "", lastname: "" } });
    }

    return (
        <div className='h-screen flex flex-col justify-between pt-2 px-4 pb-8'>
            <div>
                <LogoHeader />
                <form action=""
                    className='flex flex-col items-center justify-start gap-4'
                    onSubmit={handleSignup}>
                    <div className='flex justify-between'>

                        <input type="text"
                            required
                            placeholder='First Name'
                            className='bg-[#eeeeee] px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2 w-[49%]'
                            value={userData.fullname.firstname}
                            onChange={(e) => setUserData({ ...userData, fullname: { ...userData.fullname, firstname: e.target.value } })} />
                        <input type="text"
                            placeholder='Last Name'
                            className='bg-[#eeeeee] px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2 w-[49%]'
                            value={userData.fullname.lastname}
                            onChange={(e) => setUserData({ ...userData, fullname: { ...userData.fullname, lastname: e.target.value } })} />
                    </div>
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
                        className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'>Sign Up</button>
                </form>
                <p className='text-center'>
                    Already have an account? <Link to="/user-login" className='text-blue-700 active:text-violet-900'>Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default UserSignup