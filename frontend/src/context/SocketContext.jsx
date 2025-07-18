import React, { createContext, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    transports: ['polling']
})

export const SocketDataContext = createContext()

const SocketContext = ({children}) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket connected')
        })

        socket.on('disconnect', () => {
            console.log('Socket Disconnected')
        })
    })

    return (
        <>
            <SocketDataContext.Provider value={{socket}}>
                {children}
            </SocketDataContext.Provider>
        </>
    )
}

export default SocketContext