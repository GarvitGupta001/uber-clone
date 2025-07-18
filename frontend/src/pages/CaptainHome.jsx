import React, { useContext, useEffect, useRef, useState } from 'react'
import LogoHeader from '../components/LogoHeader'
import { Link, useNavigate } from 'react-router-dom'
import { RiLogoutBoxLine, RiHourglass2Line, RiSpeedUpFill, RiRidingLine, RiTreasureMapFill } from '@remixicon/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import { SocketDataContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainHome = () => {
  const navigate = useNavigate()

  const [verificationCode, SetVerificationCode] = useState('')
  const [rideInfo, SetRideInfo] = useState({})
  const [captainInfoPanel, SetCaptainInfoPanel] = useState(true)
  const [acceptRidePanel, SetAcceptRidePanel] = useState(false)
  const [startRidePanel, SetStartRidePanel] = useState(false)

  const captainInfoRef = useRef(null)
  const acceptRideRef = useRef(null)
  const startRideRef = useRef(null)
  const captainInfoPanelRef = useRef(captainInfoPanel);
  useEffect(() => {
    captainInfoPanelRef.current = captainInfoPanel;
  }, [captainInfoPanel]);

  const { socket } = useContext(SocketDataContext)
  const { captain } = useContext(CaptainDataContext)

  useGSAP(() => {
    if (captainInfoPanel) {
      gsap.to(captainInfoRef.current, {
        height: 'auto',
        delay: 0.6,
        padding: '16px 16px 32px 16px',
        duration: 0.5,
      })
    } else {
      gsap.to(captainInfoRef.current, {
        height: '0vh',
        padding: '0px 16px 0px 16px',
        duration: 0.5,
      })
    }
  }, [captainInfoPanel])

  useGSAP(() => {
    if (acceptRidePanel) {
      gsap.to(acceptRideRef.current, {
        height: 'auto',
        delay: 0.6,
        padding: '16px 16px 32px 16px',
        duration: 0.5,
      })
    } else {
      gsap.to(acceptRideRef.current, {
        height: '0vh',
        padding: '0px 16px 0px 16px',
        duration: 0.5,
      })
    }
  }, [acceptRidePanel])

  useGSAP(() => {
    if (startRidePanel) {
      gsap.to(startRideRef.current, {
        height: 'auto',
        delay: 0.6,
        padding: '16px 16px 32px 16px',
        duration: 0.5,
      })
    } else {
      gsap.to(startRideRef.current, {
        height: '0vh',
        padding: '0px 16px 0px 16px',
        duration: 0.5,
      })
    }
  }, [startRidePanel])

  const handleNewRide = (data) => {
    console.log(data)
    SetCaptainInfoPanel(false);
    SetAcceptRidePanel(true)
    SetRideInfo(data)
  }

  const handleIgnoreRide = () => {
    SetRideInfo({})
    SetAcceptRidePanel(false)
    SetCaptainInfoPanel(true)
  }

  const handleAcceptRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/accept`, {
      rideId: rideInfo._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.data.success) {
      SetStartRidePanel(true)
      SetAcceptRidePanel(false)
    } else {
      SetAcceptRidePanel(false)
      SetCaptainInfoPanel(true)
      SetRideInfo({})
      alert('Unable to accept ride')
    }
  }

  const handleStartRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/start`, {
      rideId: rideInfo._id,
      otp: verificationCode
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data.success)
    if (response.data.success) {
      localStorage.setItem('rideData', JSON.stringify(response.data.validatedRide))
      localStorage.setItem('paid', false)
      navigate('/captain-riding')
    }
  }

  useEffect(() => {
    socket.emit('join', {
      Id: captain._id,
      type: 'captain'
    })

    socket.on('newRide', (data) => {
      if (captainInfoPanelRef.current) {
        handleNewRide(data)
      }
    })
  })



  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit('updateLocation', {
              Id: captain._id,
              lat: latitude,
              lng: longitude,
              type: 'captain'
            });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    updateLocation();

    const intervalId = setInterval(updateLocation, 10000);

    return () => clearInterval(intervalId);
  }, [captain._id, socket]);

  return (
    <div className='h-[100vh] bg-[url("/map_bg.png")] bg-cover bg-no-repeat bg-top flex flex-col justify-between'>
      <div className='flex justify-between items-center'>
        <LogoHeader />
        <Link to="/captain-logout">
          <RiLogoutBoxLine size={50} color='red' className='bg-white mr-5 p-3 rounded-full opacity-70' />
        </Link>
      </div>
      <div>
        <div ref={captainInfoRef}
          className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col overflow-y-hidden p-4 pb-8 gap-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-medium'>{captain.fullname.firstName} {captain.fullname.lastName}</h1>
            <div>
              <h3 className='text-sm font-medium text-gray-600'>Total Earnings</h3>
              <h1 className='text-xl font-bold'>₹259</h1>
            </div>
          </div>
          <div className='flex justify-around'>
            <div className='flex flex-col items-center gap-2'>
              <RiHourglass2Line size={50} className='p-1' />
              <div>
                <p className='text-xl font-bold text-gray-600 text-center'>10.2 hr</p>
                <p className='text-sm text-center text-gray-500'>Online</p>
              </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <RiSpeedUpFill size={50} className='p-1' />
              <div>
                <h3 className='text-xl font-bold text-gray-600 text-center'>69.45 km</h3>
                <p className='text-sm text-center text-gray-500'>Driven</p>
              </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
              <RiRidingLine size={50} className='p-1' />
              <div>
                <h3 className='text-xl font-bold text-gray-600 text-center'>5</h3>
                <p className='text-sm text-center text-gray-500'>Rides Done</p>
              </div>
            </div>
          </div>
        </div>
        <div ref={acceptRideRef}
          className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-4 h-[0px] overflow-y-hidden'>
          <h2 className='text-xl font-semibold w-full text-center'>New ride found !!!</h2>
          <div className='flex justify-between'>
            <h3 className='text-2xl font-bold'>{rideInfo?.user?.fullname?.firstName} {rideInfo?.user?.fullname?.lastName}</h3>
            <h3 className='text-2xl font-bold'>1.6 km</h3>

          </div>
          <div className='flex items-center gap-2'>
            <div>
              <i className="ri-map-pin-user-fill ri-2x"></i>
            </div>
            <div className='flex flex-col justify-center'>
              <h3 className='text-xl font-semibold '>{rideInfo?.pickup?.main_text}</h3>
              <p className='text-gray-700'>{rideInfo?.pickup?.secondary_text}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div>
              <i className="ri-map-pin-2-fill ri-2x"></i>
            </div>
            <div className='flex flex-col justify-center'>
              <h3 className='text-xl font-semibold '>{rideInfo?.destination?.main_text}</h3>
              <p className='text-gray-700'>{rideInfo?.destination?.secondary_text}</p>
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
          <div className='flex gap-3'>

            <button
              type="submit"
              className='text-[#808080af] px-4 py-2 rounded w-full active:bg-[#8080801a] flex justify-center items-center gap-1'
              onClick={() => handleIgnoreRide()}><i className="ri-close-line ri-lg"></i>Ignore</button>
            <button
              type="submit"
              className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'
              onClick={() => handleAcceptRide()}>Accept</button>
          </div>
        </div>
        <div ref={startRideRef}
          className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-2 h-[0px] overflow-y-hidden'>
          <div className='flex justify-between'>
            <h3 className='text-2xl font-bold'>{rideInfo?.user?.fullname?.firstName} {rideInfo?.user?.fullname?.lastName}</h3>
            <h3 className='text-2xl font-bold'>1.6 km</h3>
          </div>
          <div className='flex items-center gap-2'>
            <div>
              <i className="ri-map-pin-user-fill ri-2x"></i>
            </div>
            <div className='flex flex-col justify-center'>
              <h3 className='text-xl font-semibold '>{rideInfo?.pickup?.main_text}</h3>
              <p className='text-gray-700'>{rideInfo?.pickup?.secondary_text}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div>
              <i className="ri-map-pin-2-fill ri-2x"></i>
            </div>
            <div className='flex flex-col justify-center'>
              <h3 className='text-xl font-semibold '>{rideInfo?.destination?.main_text}</h3>
              <p className='text-gray-700'>{rideInfo?.destination?.secondary_text}</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div>
              <i className="ri-cash-line ri-2x"></i>
            </div>
            <div className='flex flex-col justify-center'>
              <h3 className='text-xl font-semibold'>₹{rideInfo?.fare}</h3>
            </div>
          </div>
          <input
            type="number"
            value={verificationCode}
            placeholder="OTP"
            className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
            onChange={(e) => { SetVerificationCode(e.target.value) }}
          />
          <button
            className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800' onClick={() => handleStartRide()}>Start Ride</button>
        </div>
      </div>
    </div>
  )
}



export default CaptainHome