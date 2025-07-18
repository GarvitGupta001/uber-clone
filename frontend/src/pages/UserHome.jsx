import React, { useContext, useEffect, useRef, useState } from 'react'
import LogoHeader from '../components/LogoHeader'
import { RiLogoutBoxLine } from '@remixicon/react'
import 'remixicon/fonts/remixicon.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SocketDataContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'

const UserHome = () => {
  const navigate = useNavigate()

  const [panelOpen, setPanelOpen] = useState(false)
  const [pickNDropPanel, setPickNDropPanel] = useState(true)
  const [ridePanel, setRidePanel] = useState(false)
  const [driverSearchPanel, setDriverSearchPanel] = useState(false)
  const [rideConfirmedPanel, setRideConfirmedPanel] = useState(false)
  const [activeField, setActiveField] = useState('')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [fares, setFares] = useState({})
  const [vehicleType, SetVehicleType] = useState('')
  const [pickupObject, setPickupObject] = useState(null)
  const [destinationObject, setDestinationObject] = useState(null)
  const [rideInfo, setRideInfo] = useState(null)

  const arrowRef = useRef(null)
  const panelRef = useRef(null)
  const pickNDropRef = useRef(null)
  const selectRideRef = useRef(null)
  const driverSearchRef = useRef(null)
  const rideConfirmedRef = useRef(null)

  const { socket } = useContext(SocketDataContext)
  const { user } = useContext(UserDataContext)

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(arrowRef.current, {
        duration: 0.4,
        opacity: 1
      })
      gsap.to(panelRef.current, {
        height: '55vh',
        duration: 0.4,
      })
    } else {
      gsap.to(arrowRef.current, {
        duration: 0.4,
        opacity: 0
      })
      gsap.to(panelRef.current, {
        height: '0vh',
        duration: 0.4,
      })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (pickNDropPanel) {
      gsap.to(pickNDropRef.current, {
        height: 'auto',
        delay: 0.6,
        padding: '16px 16px 32px 16px',
        duration: 0.5,
      })
    } else {
      gsap.to(pickNDropRef.current, {
        height: '0vh',
        padding: '0px 16px 0px 16px',
        duration: 0.5,
      })
    }
  }, [pickNDropPanel])

  useGSAP(() => {
    if (ridePanel) {
      gsap.to(selectRideRef.current, {
        height: 'auto',
        padding: '16px 16px 32px 16px',
        delay: 0.6,
        duration: 0.5,
      })
    } else {
      gsap.to(selectRideRef.current, {
        height: '0vh',
        padding: '0px 16px 0px 16px',
        duration: 0.5,
      })
    }
  }, [ridePanel])

  useGSAP(() => {
    if (driverSearchPanel) {
      gsap.to(driverSearchRef.current, {
        height: 'auto',
        padding: '16px 16px 32px 16px',
        delay: 0.6,
        duration: 0.5,
      })
    } else {
      gsap.to(driverSearchRef.current, {
        height: '0vh',
        padding: '0px 16px 0px 16px',
        duration: 0.5,
      })
    }
  }, [driverSearchPanel])

  useGSAP(() => {
    if (rideConfirmedPanel) {
      gsap.to(rideConfirmedRef.current, {
        height: 'auto',
        padding: '16px 16px 32px 16px',
        delay: 0.6,
        duration: 0.5,
      })
    } else {
      gsap.to(rideConfirmedRef.current, {
        height: '0vh',
        padding: '0px 16px 0px 16px',
        duration: 0.5,
      })
    }
  }, [rideConfirmedPanel])

  const updateSuggestions = async (search) => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/suggestions?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const results = response.data.suggestions
    const formatedResults = results.map((result) => {
      return {
        main_text: result.structured_formatting.main_text,
        secondary_text: result.structured_formatting.secondary_text,
        place_id: result.place_id
      }
    })
    setSuggestions(formatedResults)
  }

  const updateFares = async () => {
    const token = localStorage.getItem('token')
    const url = `${import.meta.env.VITE_BASE_URL}/ride/fare?pickupPlaceId=${pickupObject.place_id}&destinationPlaceId=${destinationObject.place_id}`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setFares(response.data.fares)
  }

  const createRide = async () => {
    const token = localStorage.getItem('token')
    const url = `${import.meta.env.VITE_BASE_URL}/ride/create`
    const response = await axios.post(url, {
      pickup: pickupObject, destination: destinationObject, vehicleType: vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  useEffect(() => {
    socket.on('rideAccepted', (data) => {
      setRideConfirmedPanel(true)
      setDriverSearchPanel(false)
      setRideInfo(data)
      console.log('Ride accepted by captain:', data);
    });

    socket.on('rideStarted', (data) => {
      localStorage.setItem('rideData', JSON.stringify(data))
      localStorage.setItem('paid', false)
      navigate('/user-riding')
    })

    return () => {
      socket.off('rideAccepted');
      socket.off('rideStarted')
    };
  }, [socket]);


  useEffect(() => {
    socket.emit('join', {
      Id: user._id,
      type: 'user'
    })
  })

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit('updateLocation', {
              Id: user._id,
              lat: latitude,
              lng: longitude,
              type: 'user'
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
  }, [user._id, socket]);

  return (
    <div className='h-[100vh] bg-[url("map_bg.gif")] bg-cover bg-no-repeat bg-top flex flex-col justify-between'>
      <div className='flex justify-between items-center'>
        <LogoHeader />
        <Link to="/user-logout">
          <RiLogoutBoxLine size={50} color='red' className='bg-white mr-5 p-3 rounded-full opacity-70' />
        </Link>
      </div>
      <div>
        <div ref={pickNDropRef}
          className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col overflow-y-hidden p-4 pb-8'>
          <form action="" className='flex flex-col' onSubmit={(e) => {
            e.preventDefault();
          }}>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between mb-2'>
                <h2 className='text-xl font-semibold'>Find a Trip</h2>
                <i className="ri-arrow-down-s-line ri-lg opacity-0"
                  onClick={() => setPanelOpen(false)}
                  ref={arrowRef}></i>
              </div>
              <input
                type="text"
                value={pickup}
                placeholder="Pickup Location"
                className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
                onChange={async (e) => { setPickup(e.target.value); await updateSuggestions(e.target.value); }}
              />
              <input
                type="text"
                value={destination}
                placeholder="Destination"
                className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                onChange={(e) => { setDestination(e.target.value); updateSuggestions(e.target.value) }}
              />
            </div>
            <div className={`flex flex-col h-[0vh] overflow-y-hidden`} ref={panelRef}>
              <div className='h-full overflow-y-scroll m-1 flex flex-col gap-2 overflow-x-hidden'>
                {suggestions.map((suggestion, index) => (
                  <div className='flex items-center gap-2'
                    key={index}
                    onClick={() => {
                      if (activeField === 'pickup') {
                        setPickup(suggestion.main_text);
                        setPickupObject(suggestion);
                      } else if (activeField === 'destination') {
                        setDestination(suggestion.main_text);
                        setDestinationObject(suggestion);
                      }
                      setSuggestions([]);
                    }}>
                    <div>
                      <i className="ri-map-pin-2-fill ri-xl"></i>
                    </div>
                    <div className='flex flex-col justify-center'>
                      <h3 className='text-base font-semibold'>{suggestion.main_text}</h3>
                      <p className='text-sm text-gray-700'>{suggestion.secondary_text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'
                onClick={() => { updateFares(); setRidePanel(true); setPickNDropPanel(false); setPanelOpen(false) }}>Confirm</button>
            </div>
          </form>
        </div>
        <div ref={selectRideRef}
          className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-4 h-[0px] overflow-y-hidden'>
          <div className='flex items-center justify-start gap-2'>
            <i className="ri-arrow-left-s-line ri-lg" onClick={() => { setRidePanel(false); setPickNDropPanel(true) }}></i>
            <h2 className='text-xl font-semibold'>Select your ride</h2>
          </div>
          <div className={`${vehicleType === 'car' ? 'border-black' : 'border-white'} border-2 py-2 flex rounded-xl items-center justify-between`} onClick={() => SetVehicleType('car')}>
            <div className='flex items-center gap-2'>
              <img src="car.webp" alt="car" className='h-13' />
              <div className='flex flex-col justify-center'>
                <h2 className='text-lg font-medium flex justify-start items-center'>Car <span className='font-medium text-base ml-1'><i className="ri-user-3-fill ri-sm"></i>4</span></h2>
                <h4 className='text-sm font-medium text-gray-700'>3 min away</h4>
              </div>
            </div>
            <h2 className='font-medium text-lg p-2'>₹{fares.car}</h2>
          </div>
          <div className={`${vehicleType === 'bike' ? 'border-black' : 'border-white'} border-2 py-2 flex rounded-xl items-center justify-between`} onClick={() => SetVehicleType('bike')}>
            <div className='flex items-center gap-2'>
              <img src="bike.webp" alt="car" className='h-13' />
              <div className='flex flex-col justify-center'>
                <h2 className='text-lg font-medium flex justify-start items-center'>Bike <span className='font-medium text-base ml-1'><i className="ri-user-3-fill ri-sm"></i>1</span></h2>
                <h4 className='text-sm font-medium text-gray-700'>2 min away</h4>
              </div>
            </div>
            <h2 className='font-medium text-lg p-2'>₹{fares.bike}</h2>
          </div>
          <div className={`${vehicleType === 'auto' ? 'border-black' : 'border-white'} border-2 py-2 flex rounded-xl items-center justify-between`} onClick={() => SetVehicleType('auto')}>
            <div className='flex items-center gap-2'>
              <img src="auto.webp" alt="car" className='h-13' />
              <div className='flex flex-col justify-center'>
                <h2 className='text-lg font-medium flex justify-start items-center'>Auto <span className='font-medium text-base ml-1'><i className="ri-user-3-fill ri-sm"></i>3</span></h2>
                <h4 className='text-sm font-medium text-gray-700'>3 min away</h4>
              </div>
            </div>
            <h2 className='font-medium text-lg p-2'>₹{fares.auto}</h2>
          </div>
          <button
            type="submit"
            className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800' onClick={() => { setRidePanel(false); setDriverSearchPanel(true); createRide() }}>Confirm</button>
        </div>
        <div ref={driverSearchRef}
          className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-3 h-[0px] overflow-y-hidden'>
          <h2 className='text-xl font-semibold w-full text-center'>Looking for drivers...</h2>
          <div className="w-full flex items-center">
            <div className="w-full h-[5px] bg-[#eeeeee] rounded-full overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full bg-gray-950 rounded-full animate-loader-bar" style={{ width: '40%' }}></div>
            </div>
            <style>
              {`
                @keyframes loader-bar {
                  0% { left: -40%; width: 40%; }
                  50% { left: 30%; width: 40%; }
                  100% { left: 100%; width: 40%; }
                }
                .animate-loader-bar {
                  animation: loader-bar 1.5s infinite cubic-bezier(0.4,0,0.2,1);
                }
              `}
            </style>
          </div>
          <div className='flex items-center justify-center'>
            <img src={`${vehicleType}.webp`} alt="" className='h-20' />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div>
                <i className="ri-map-pin-user-fill ri-xl"></i>
              </div>
              <div className='flex flex-col justify-center'>
                <h3 className='text-base font-semibold '>{pickupObject?.main_text}</h3>
                <p className='text-sm text-gray-700'>{pickupObject?.secondary_text}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <i className="ri-map-pin-2-fill ri-xl"></i>
              </div>
              <div className='flex flex-col justify-center'>
                <h3 className='text-base font-semibold '>{destinationObject?.main_text}</h3>
                <p className='text-sm text-gray-700'>{destinationObject?.secondary_text}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <i className="ri-cash-line ri-xl"></i>
              </div>
              <div className='flex flex-col justify-center'>
                <h3 className='text-base font-semibold '>₹{fares[vehicleType]}</h3>
              </div>
            </div>
          </div>
          <button
            type="button"
            className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800' onClick={() => { setRidePanel(true); setDriverSearchPanel(false) }}>Cancel Search</button>
        </div>
        <div ref={rideConfirmedRef}
          className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-4 overflow-y-hidden p-4 pb-8'>
          <h2 className='text-xl font-semibold w-full text-center'>Ride Confirmed</h2>
          <div className='flex justify-between'>
            <img src={`${rideInfo?.vehicle}.webp`} alt={`${rideInfo?.vehicle}}`} className='h-20' />
            <div>
              <h1 className='text-right text-xl font-medium mb-1'>{rideInfo?.captain.fullname.firstName} {rideInfo?.captain.fullname.lastName}</h1>
              <h3 className='text-2xl font-bold text-right mb-1'>{rideInfo?.captain.vehicle.number}</h3>
              <h2 className='text-2xl flex justify-end gap-1 items-center'>
                <span className='text-white bg-black flex px-2 rounded-sm'>{rideInfo?.otp[0]}</span>
                <span className='text-white bg-black flex px-2 rounded-sm'>{rideInfo?.otp[1]}</span>
                <span className='text-white bg-black flex px-2 rounded-sm'>{rideInfo?.otp[2]}</span>
                <span className='text-white bg-black flex px-2 rounded-sm'>{rideInfo?.otp[3]}</span>
              </h2>
            </div>
          </div>
          <div>

          </div>
          <div className='flex items-center gap-2'>
            <div>
              <i className="ri-map-pin-2-fill ri-2x"></i>
            </div>
            <div className='flex flex-col justify-center'>
              <h3 className='text-xl font-semibold '>{rideInfo?.destination.main_text}</h3>
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
        </div>
      </div>
    </div>
  )
}

export default UserHome