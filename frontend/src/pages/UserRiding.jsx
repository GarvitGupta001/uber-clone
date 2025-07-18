import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoHeader from '../components/LogoHeader'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketDataContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'


const UserRiding = () => {
    const navigate = useNavigate()
    const rideInfo = JSON.parse(localStorage.getItem('rideData'))

    const [paid, setPaid] = useState(localStorage.getItem('paid') === 'true' ? true : false)
    const [paymentConfirmingPopUp, setPaymentConfirmingPopUp] = useState(false)

    const paymentConfirmingPopUpRef = useRef(null)

    const { socket } = useContext(SocketDataContext)
    const { user } = useContext(UserDataContext)


    useGSAP(() => {
        if (paymentConfirmingPopUp) {
            const tl = gsap.timeline()
            tl.to(paymentConfirmingPopUpRef.current, {
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
            }).to(paymentConfirmingPopUpRef.current, {
                opacity: 1,
                duration: 0.2,
            })
        } else {
            const tl = gsap.timeline()
            tl.to(paymentConfirmingPopUpRef.current, {
                opacity: 0,
                duration: 0.2,
            }).to(paymentConfirmingPopUpRef.current, {
                height: '0vh',
                width: '0vw',
                display: 'none',
            })
        }
    }, [paymentConfirmingPopUp])

    const handleMakePayment = () => {
        setPaymentConfirmingPopUp(true)
        socket.emit('makePayment', {
            rideId: rideInfo._id
        })
    }

    useEffect(() => {
        socket.on('paymentConfirmed', () => {
            setPaid(true)
            setPaymentConfirmingPopUp(false)
            localStorage.setItem('paid', true)
        })

        socket.on('rideCompleted', ()=> {
            localStorage.removeItem('rideData')
            localStorage.removeItem('paid')
            navigate('/user-home')
        })

        return () => {
            socket.off('paymentConfirmed')
            socket.off('rideCompleted')
        }
    }, [socket])


    useEffect(() => {
        socket.emit('join', {
            Id: user._id,
            type: 'user'
        })
    })


    return (
        <div className='h-[100vh] bg-[url("/map_bg.png")] bg-cover bg-no-repeat bg-top flex flex-col justify-between'>
            <LogoHeader />
            <div>
                <div
                    className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-4 overflow-y-hidden p-4 pb-8'>
                    <h2 className='text-xl font-semibold w-full text-center'>Enjoy your ride!</h2>
                    <div className='flex justify-between items-center'>
                        <img src={`${rideInfo.vehicle}.webp`} alt={`${rideInfo.vehicle}}`} className='h-20' />
                        <div>
                            <h1 className='text-right text-xl font-medium'>{rideInfo?.captain.fullname.firstName} {rideInfo?.captain.fullname.lastName}</h1>
                            <h3 className='text-2xl font-bold'>{rideInfo?.captain.vehicle.number}</h3>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div>
                            <i className="ri-map-pin-2-fill ri-2x"></i>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <h3 className='text-xl font-semibold'>{rideInfo?.destination.main_text}</h3>
                            <p className='text-gray-700'>{rideInfo?.destination.secondary_text}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div>
                            <i className="ri-cash-line ri-2x"></i>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <h3 className='text-xl font-semibold '>₹{rideInfo?.fare}</h3>
                        </div>
                    </div>
                    {!paid ? <button
                        type="button"
                        className='bg-emerald-600 text-white px-4 py-2 rounded w-full active:bg-emerald-800'
                        onClick={() => { handleMakePayment() }}>Make Payment</button> : null}
                </div>
            </div>
            <div ref={paymentConfirmingPopUpRef}
                className='absolute backdrop-blur-md z-10 justify-center items-center h-0 w-0 hidden opacity-0'>
                <div className='text-3xl text-center font-semibold'>
                    Waiting for <br />
                    captain <br />
                    to Confirm Payment...
                </div>
            </div>
        </div>
    )
}

export default UserRiding