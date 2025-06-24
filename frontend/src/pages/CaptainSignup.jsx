import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoHeader from '../components/LogoHeader'

const CaptainSignup = () => {
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: ""
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      number: "",
      type: "",
      capacity: ""
    }
  })

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(user);
    setUser({ email: "", password: "", fullname: { firstname: "", lastname: "" }, vehicle: { color: "", number: "", type: "", capacity: "" } });
  }

  return (
    <div className='h-screen flex flex-col justify-between pt-2 px-4 pb-8'>
      <div>
        <LogoHeader />
        <form action=""
          className='flex flex-col items-center justify-start gap-4'
          onSubmit={handleSignup}>
          <div className='w-full'>
            <h3 className='text-lg mb-2 font-medium'>Personal Information</h3>
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
          </div>
          <div className='w-full'>
            <h3 className='text-lg mb-2 font-medium'>Vehicle Information</h3>
            <input type="text"
              required
              placeholder='Color'
              className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
              value={user.vehicle.color}
              onChange={(e) => setUser({ ...user, vehicle: { ...user.vehicle, color: e.target.value } })} />
            <input type="text"
              required
              placeholder='Number'
              className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
              value={user.vehicle.number}
              onChange={(e) => setUser({ ...user, vehicle: { ...user.vehicle, number: e.target.value } })} />
            <input type="text"
              required
              placeholder='Type'
              className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
              value={user.vehicle.type}
              onChange={(e) => setUser({ ...user, vehicle: { ...user.vehicle, type: e.target.value } })} />
            <input type="text"
              required
              placeholder='Capacity'
              className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
              value={user.vehicle.capacity}
              onChange={(e) => setUser({ ...user, vehicle: { ...user.vehicle, capacity: e.target.value } })} />
          </div>

          <button type="submit"
            className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'>Sign Up</button>
        </form>
        <p className='text-center'>
          Already a captain? <Link to="/captain-login" className='text-blue-700 active:text-violet-900'>Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup