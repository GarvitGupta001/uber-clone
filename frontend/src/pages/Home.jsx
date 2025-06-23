import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-cover bg-top-left bg-[url(/home-background.jpg)]'>
        <div className='h-screen w-screen flex flex-col justify-between items-start'>
            <img src={logo} className='h-20 mt-6'/>
            <div className='bg-white w-screen flex flex-col justify-start items-center gap-4 p-4'>
                <h2 className='font-bold text-2xl'>Get Started with Uber</h2>
                <Link to='/login' className='bg-black text-white px-4 py-2 w-full text-center rounded-sm'>
                    Continue
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home