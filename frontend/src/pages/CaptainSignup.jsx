import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoHeader from '../components/LogoHeader'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'


const CaptainSignup = () => {
  const { setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()
  const [captainData, setCaptainData] = useState({
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
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.token);
      setCaptain(response.data.captain);
      navigate("/captain-home");
    }
    setCaptainData({ email: "", password: "", fullname: { firstname: "", lastname: "" }, vehicle: { color: "", number: "", type: "", capacity: "" } });
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
                value={captainData.fullname.firstname}
                onChange={(e) => setCaptainData({ ...captainData, fullname: { ...captainData.fullname, firstname: e.target.value } })} />
              <input type="text"
                placeholder='Last Name'
                className='bg-[#eeeeee] px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2 w-[49%]'
                value={captainData.fullname.lastname}
                onChange={(e) => setCaptainData({ ...captainData, fullname: { ...captainData.fullname, lastname: e.target.value } })} />
            </div>
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
          </div>
          <div className='w-full'>
            <h3 className='text-lg mb-2 font-medium'>Vehicle Information</h3>
            <input type="text"
              required
              placeholder='Color'
              className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
              value={captainData.vehicle.color}
              onChange={(e) => setCaptainData({ ...captainData, vehicle: { ...captainData.vehicle, color: e.target.value } })} />
            <input type="text"
              required
              placeholder='Number'
              className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
              value={captainData.vehicle.number}
              onChange={(e) => setCaptainData({ ...captainData, vehicle: { ...captainData.vehicle, number: e.target.value } })} />
            <select
              required
              className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
              value={captainData.vehicle.type}
              onChange={(e) => setCaptainData({ ...captainData, vehicle: { ...captainData.vehicle, type: e.target.value } })}>
              <option value="" disabled hidden>Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
            <input type="number"
              required
              placeholder='Capacity'
              className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
              value={captainData.vehicle.capacity}
              onChange={(e) => setCaptainData({ ...captainData, vehicle: { ...captainData.vehicle, capacity: e.target.value } })} />
          </div>

          <button type="submit"
            className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'>Sign Up</button>
        </form>
        <p className='text-center'>
          Already a captainData? <Link to="/captain-login" className='text-blue-700 active:text-violet-900'>Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup