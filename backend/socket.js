const socketIO = require('socket.io')
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')
const rideModel = require('./models/ride.model')

let io

module.exports.initialiseSocketIO = (server) => {
    io = socketIO(server, {
        cors: {
            origin: ['https://uber-clone-indol-gamma.vercel.app', 'http://localhost:5173']
        },
        methods: ['GET', 'POST'],
        credentials: true
    })

    io.on('connection', (socket) => {
        console.log(`Client connected with Socket Id ${socket.id}`)

        socket.on('disconnect', () => {
            console.log(`Client ${socket.id} disconnected`)
        })

        socket.on('join', async (data) => {
            const { Id, type } = data
            try {
                if (type === 'user') {
                    const user = await userModel.findById(Id)
                    user.socketID = socket.id
                    await user.save()
                } else if (type === 'captain') {
                    const captain = await captainModel.findById(Id)
                    captain.socketID = socket.id
                    await captain.save()
                }
            } catch (error) {
                console.error("Error updating socketId", error)
            }
        })

        socket.on('updateLocation', async (data) => {
            const { Id, lat, lng, type } = data
            try {
                if (type === 'user') {
                    const user = await userModel.findById(Id)
                    user.location.coordinates = [lng, lat]
                    await user.save()
                } else if (type === 'captain') {
                    const captain = await captainModel.findById(Id)
                    captain.location.coordinates = [lng, lat]
                    await captain.save()
                }
            } catch (error) {
                console.log("Error updating location", error)
            }
        })

        socket.on('makePayment', async (data) => {
            const { rideId } = data
            const ride = await rideModel.findById(rideId)
            await ride.populate('captain')
            io.to(ride.captain.socketID).emit('confirmPayment')
        })

        socket.on('confirmPayment', async (data) => {
            const { rideId } = data
            const ride = await rideModel.findById(rideId)
            await ride.populate('user')
            io.to(ride.user.socketID).emit('paymentConfirmed')
        })

    })
}

module.exports.sendMessageToSocket = (socketId, message) => {
    if (!io) {
        console.error("Socket IO not initialised")
        return
    }
    console.log(message)
    io.to(socketId).emit(message.event, message.data)
}