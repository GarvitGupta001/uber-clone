import React from 'react'
import { Link } from 'react-router-dom'
import LogoHeader from '../components/LogoHeader'

const UserRiding = () => {
    return (
        <div className='h-[100vh] bg-[url("map_bg.gif")] bg-cover bg-no-repeat bg-top flex flex-col justify-between'>
            <LogoHeader />
            <div>
                <div
                    className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-3 overflow-y-hidden p-4 pb-8'>
                    <h2 className='text-xl font-semibold w-full text-center'>Enjoy your ride!</h2>
                    <Link to="/user-home">
                        <button
                            type="button"
                            className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'>Payment Done</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserRiding