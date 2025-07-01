import React, { use, useRef, useState } from 'react'
import LogoHeader from '../components/LogoHeader'
import 'remixicon/fonts/remixicon.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

const sampleSuggestions = [
  { id: 1, name: 'Central Park', address: '5th Ave, New York, NY 10022' },
  { id: 2, name: 'Empire State Building', address: '20 W 34th St, New York, NY 10001' },
  { id: 3, name: 'Times Square', address: 'Manhattan, NY 10036' },
  { id: 4, name: 'Brooklyn Bridge', address: 'Brooklyn Bridge, New York, NY 10038' },
  { id: 5, name: 'Grand Central Terminal', address: '89 E 42nd St, New York, NY 10017' },
  { id: 6, name: 'Statue of Liberty', address: 'Liberty Island, New York, NY 10004' },
  { id: 7, name: 'Metropolitan Museum of Art', address: '1000 5th Ave, New York, NY 10028' },
  { id: 8, name: 'Rockefeller Center', address: '45 Rockefeller Plaza, New York, NY 10111' },
  { id: 9, name: 'Madison Square Garden', address: '4 Pennsylvania Plaza, New York, NY 10001' },
  { id: 10, name: 'Bryant Park', address: 'New York, NY 10018' },
  { id: 11, name: 'One World Trade Center', address: '285 Fulton St, New York, NY 10007' },
  { id: 12, name: 'Chrysler Building', address: '405 Lexington Ave, New York, NY 10174' },
  { id: 13, name: 'The High Line', address: 'New York, NY 10011' },
  { id: 14, name: 'Museum of Modern Art', address: '11 W 53rd St, New York, NY 10019' },
  { id: 15, name: 'Yankee Stadium', address: '1 E 161 St, Bronx, NY 10451' }
]

const UserHome = () => {
  const [suggestions, setSuggestions] = useState([])
  const [panelOpen, setPanelOpen] = useState(false)
  const [pickNDropPanel, setPickNDropPanel] = useState(true)
  const [ridePanel, setRidePanel] = useState(false)
  const [driverSearchPanel, setDriverSearchPanel] = useState(false)
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [rideType, setRideType] = useState('')
  const [activeField, setActiveField] = useState('')
  const [pickupObject, setPickupObject] = useState(null)
  const [destinationObject, setDestinationObject] = useState(null)

  const arrowRef = useRef(null)
  const panelRef = useRef(null)
  const pickNDropRef = useRef(null)
  const selectRideRef = useRef(null)
  const driverSearchRef = useRef(null)

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

  return (
    <div className='h-[100vh] bg-[url("map_bg.gif")] bg-cover bg-no-repeat bg-top flex flex-col justify-between'>
      <LogoHeader />
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
                onChange={(e) => { setPickup(e.target.value); setSuggestions(sampleSuggestions); }}
              />
              <input
                type="text"
                value={destination}
                placeholder="Destination"
                className='bg-[#eeeeee] w-full px-3 py-2 rounded text-base font-medium placeholder:text-sm placeholder:text-gray-400 placeholder:font-medium mb-2'
                onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                onChange={(e) => { setDestination(e.target.value); setSuggestions(sampleSuggestions); }}
              />
            </div>
            <div className={`flex flex-col h-[0vh] overflow-y-hidden`} ref={panelRef}>
              <div className='h-full overflow-y-scroll m-1 flex flex-col gap-2'>
                {suggestions.map((suggestion) => (
                  <div className='flex items-center gap-2'
                    key={suggestion.id}
                    onClick={() => {
                      if (activeField === 'pickup') {
                        setPickup(suggestion.name);
                        setPickupObject(suggestion);
                      } else if (activeField === 'destination') {
                        setDestination(suggestion.name);
                        setDestinationObject(suggestion);
                      }
                      setSuggestions([]);
                    }}>
                    <div>
                      <i className="ri-map-pin-2-fill ri-xl"></i>
                    </div>
                    <div className='flex flex-col justify-center'>
                      <h3 className='text-base font-semibold '>{suggestion.name}</h3>
                      <p className='text-sm text-gray-700'>{suggestion.address}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'
                onClick={() => { setRidePanel(true); setPickNDropPanel(false); setPanelOpen(false) }}>Confirm</button>
            </div>
          </form>
        </div>
        <div ref={selectRideRef}
          className='bg-white rounded-t-2xl shadow-[0px_-5px_52px_2px_rgba(0,0,0,0.49)] flex flex-col gap-4 h-[0px] overflow-y-hidden'>
          <div className='flex items-center justify-start gap-2'>
            <i className="ri-arrow-left-s-line ri-lg" onClick={() => { setRidePanel(false); setPickNDropPanel(true) }}></i>
            <h2 className='text-xl font-semibold'>Select your ride</h2>
          </div>
          <div className={`${rideType === 'car' ? 'border-black' : 'border-white'} border-2 py-2 flex rounded-xl items-center justify-between`} onClick={() => setRideType('car')}>
            <div className='flex items-center gap-2'>
              <img src="car.webp" alt="car" className='h-13' />
              <div className='flex flex-col justify-center'>
                <h2 className='text-lg font-medium flex justify-start items-center'>Car <span className='font-medium text-base ml-1'><i className="ri-user-3-fill ri-sm"></i>4</span></h2>
                <h4 className='text-sm font-medium text-gray-700'>5 min away</h4>
              </div>
            </div>
            <h2 className='font-medium text-lg p-2'>₹143</h2>
          </div>
          <div className={`${rideType === 'bike' ? 'border-black' : 'border-white'} border-2 py-2 flex rounded-xl items-center justify-between`} onClick={() => setRideType('bike')}>
            <div className='flex items-center gap-2'>
              <img src="bike.webp" alt="car" className='h-13' />
              <div className='flex flex-col justify-center'>
                <h2 className='text-lg font-medium flex justify-start items-center'>Bike <span className='font-medium text-base ml-1'><i className="ri-user-3-fill ri-sm"></i>1</span></h2>
                <h4 className='text-sm font-medium text-gray-700'>2 min away</h4>
              </div>
            </div>
            <h2 className='font-medium text-lg p-2'>₹65</h2>
          </div>
          <div className={`${rideType === 'auto' ? 'border-black' : 'border-white'} border-2 py-2 flex rounded-xl items-center justify-between`} onClick={() => setRideType('auto')}>
            <div className='flex items-center gap-2'>
              <img src="auto.webp" alt="car" className='h-13' />
              <div className='flex flex-col justify-center'>
                <h2 className='text-lg font-medium flex justify-start items-center'>Auto <span className='font-medium text-base ml-1'><i className="ri-user-3-fill ri-sm"></i>3</span></h2>
                <h4 className='text-sm font-medium text-gray-700'>3 min away</h4>
              </div>
            </div>
            <h2 className='font-medium text-lg p-2'>₹107</h2>
          </div>
          <button
            type="submit"
            className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800' onClick={() => { setRidePanel(false); setDriverSearchPanel(true) }}>Confirm</button>
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
            <img src={`${rideType}.webp`} alt="" className='h-20'/>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div>
                <i className="ri-map-pin-user-fill ri-xl"></i>
              </div>
              <div className='flex flex-col justify-center'>
                <h3 className='text-base font-semibold '>{pickupObject?.name}</h3>
                <p className='text-sm text-gray-700'>{pickupObject?.address}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <i className="ri-map-pin-2-fill ri-xl"></i>
              </div>
              <div className='flex flex-col justify-center'>
                <h3 className='text-base font-semibold '>{destinationObject?.name}</h3>
                <p className='text-sm text-gray-700'>{destinationObject?.address}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div>
                <i className="ri-cash-line ri-xl"></i>  
              </div>
              <div className='flex flex-col justify-center'>
                <h3 className='text-base font-semibold '>₹143</h3>
              </div>
            </div>
          </div>
          <button
            type="button"
            className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800' onClick={() => { setRidePanel(true); setDriverSearchPanel(false) }}>Cancel Search</button>
          <Link to="/user-riding">
            <button
              type="button"
              className='bg-black text-white px-4 py-2 rounded w-full active:bg-gray-800'>Driver Found</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserHome