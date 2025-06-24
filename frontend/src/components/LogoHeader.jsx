import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const LogoHeader = () => {
    return (
        <div>
            <Link to='/'>
                <img src={logo} className='h-20' />
            </Link>
        </div>
    )
}

export default LogoHeader