import React from 'react'
import LogoHeader from '../components/LogoHeader'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-cover bg-top-left bg-[url(/home-background.jpg)] h-screen flex flex-col justify-between'>
            <LogoHeader />
            <div className='bg-white w-screen flex flex-col justify-start items-center gap-4 p-4'>
                <h2 className='font-bold text-2xl'>Get Started with Uber</h2>
                <Link to='/login' className='bg-black text-white px-4 py-2 w-full text-center rounded-sm'>
                    Continue
                </Link>
            </div>
        </div>
  )
}

export default Home