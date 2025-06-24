import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoHeader from '../components/LogoHeader'

const UserSignup = () => {
    const [user, setUser] = useState({
        fullname: {
            firstname: "",
            lastname: ""
        },
        email: "",
        password: ""
    })

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(user);
        setUser({ email: "", password: "", fullname: { firstname: "", lastname: "" } });
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
                            value={user.fullname.firstname}
                            onChange={(e) => setUser({ ...user, fullname: { ...user.fullname, firstname: e.target.value } })} />
                        <input type="text"
                            placeholder='Last Name'
                            className='bg-[#eeeeee] px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2 w-[49%]'
                            value={user.fullname.lastname}
                            onChange={(e) => setUser({ ...user, fullname: { ...user.fullname, lastname: e.target.value } })} />
                    </div>
                    <input type="email"
                        required
                        placeholder='user_mail@example.com'
                        className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <input type="password"
                        required
                        placeholder='Password'
                        className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <button type="submit"
                        className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'>Sign Up</button>
                </form>
                <p className='text-center'>
                    Already have an account? <Link to="/login" className='text-blue-700 active:text-violet-900'>Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default UserSignup