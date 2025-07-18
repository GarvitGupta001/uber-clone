import React, { useContext, useEffect, useRef, useState } from 'react'
import LogoHeader from '../components/LogoHeader'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import { SocketDataContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainRiding = () => {
    const navigate = useNavigate()
    const rideInfo = JSON.parse(localStorage.getItem('rideData'))

    const [paid, setPaid] = useState(localStorage.getItem('paid') === 'true' ? true : false)
    const [confirmPaymentPopUp, setConfirmPaymentPopUp] = useState(false)

    const confirmPaymentPopUpRef = useRef(null)

    const { socket } = useContext(SocketDataContext)
    const { captain } = useContext(CaptainDataContext)

    useGSAP(() => {
        if (confirmPaymentPopUp) {
            const tl = gsap.timeline()
            tl.to(confirmPaymentPopUpRef.current, {
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
            }).to(confirmPaymentPopUpRef.current, {
                opacity: 1,
                duration: 0.2,
            })
        } else {
            const tl = gsap.timeline()
            tl.to(confirmPaymentPopUpRef.current, {
                opacity: 0,
                duration: 0.2,
            }).to(confirmPaymentPopUpRef.current, {
                height: '0vh',
                width: '0vw',
                display: 'none',
            })
        }
    }, [confirmPaymentPopUp])

    const handleRecievePayment = () => {
        setPaid(true)
        localStorage.setItem('paid', true)
        socket.emit('confirmPayment', {
            rideId: rideInfo._id
        })
        setConfirmPaymentPopUp(false)
    }

    const handleFinishRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/finish`, {
            rideId: rideInfo._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.data.success) {
            localStorage.removeItem('rideData')
            localStorage.removeItem('paid')
            navigate('/captain-home')
        } else {
            alert('Unable to finish ride')
        }
    }

    useEffect(() => {
        socket.on('confirmPayment', () => {
            setConfirmPaymentPopUp(true)
        })
        return () => {
            socket.off('confirmPayment')
        }
    }, [socket])

    useEffect(() => {
        socket.emit('join', {
            Id: captain._id,
            type: 'captain'
        })
    })


    return (
        <div className='h-[100vh] bg-[url("/map_bg.png")] bg-cover bg-no-repeat bg-top flex flex-col justify-between'>
            <LogoHeader />
            <div>
                <div
                    className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-4 overflow-y-hidden p-4 pb-8'>
                    <h2 className='text-xl font-semibold w-full text-center'>Ride Started</h2>
                    <div className='flex justify-between'>
                        <h3 className='text-2xl font-bold'>{rideInfo?.user?.fullname?.firstName} {rideInfo?.user?.fullname?.lastName}</h3>
                        <h3 className='text-2xl font-bold'>1.6 km</h3>
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
                    {paid ? <button
                        type="button"
                        className='bg-emerald-600 text-white px-4 py-2 rounded w-full active:bg-emerald-800'
                        onClick={() => { handleFinishRide() }}>Finish Ride</button> : null}
                </div>
            </div>
            <div ref={confirmPaymentPopUpRef}
                className='absolute backdrop-blur-md z-10 justify-center items-center gap-2 h-0 w-0 hidden opacity-0'>
                <div className='text-3xl text-center font-semibold'>
                    Recieve payment<br />
                    from the user
                </div>
                <button
                    type="button"
                    className='bg-emerald-600 text-white px-4 py-2 rounded active:bg-emerald-800'
                    onClick={() => { handleRecievePayment() }}>Recieved Payment</button>
            </div>
        </div>
    )
}

export default CaptainRiding