const rideService = require('../services/ride.service')
const mapService = require('../services/map.service')
const { validationResult } = require('express-validator')
const { sendMessageToSocket } = require('../socket')

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucess: false,
            errors: errors.array()
        })
    }

    const { pickup, destination, vehicleType } = req.body


    try {
        const fares = await rideService.getFare(pickup.place_id, destination.place_id)
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const newRide = await rideService.createRide(req.user._id, pickup, destination, fares[vehicleType], otp, vehicleType)
        if (!newRide) {
            return res.status(400).json({
                success: false,
                message: "error creating ride"
            })
        }
        const ride = await newRide.populate('user')
        const pickupCoordinates = await mapService.getCoordinates(pickup.place_id)
        const captains = await rideService.getNearbyCaptains(pickupCoordinates.lat, pickupCoordinates.lng, 10)
        captains.forEach(captain => {
            if (captain.vehicle.type === vehicleType) {
                const rideDataForSocket = {
                    _id: ride._id,
                    pickup: ride.pickup,
                    destination: ride.destination,
                    fare: ride.fare,
                    vehicle: ride.vehicle,
                    user: {
                        _id: ride.user._id,
                        fullname: ride.user.fullname
                    },
                    status: ride.status,
                    duration: ride.duration,
                    distance: ride.distance
                }
                sendMessageToSocket(captain.socketID, {
                    event: 'newRide',
                    data: rideDataForSocket
                })
            }
        })
        return res.status(201).json({
            success: true,
            newRide
        })

    } catch (error) {
        console.error("Unable to create ride", error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucess: false,
            errors: errors.array()
        })
    }

    const { pickupPlaceId, destinationPlaceId } = req.query

    try {
        const fares = await rideService.getFare(pickupPlaceId, destinationPlaceId)
        return res.status(200).json({
            success: true,
            fares
        })

    } catch (error) {
        console.error("Unable to get fares", error)
        return res.status(500).json({
            success: false,
            error
        })
    }

}

module.exports.acceptRide = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucess: false,
            errors: errors.array()
        })
    }

    try {
        const { rideId } = req.body;
        const captainId = req.captain.id;

        const ride = await rideService.acceptRide(rideId, captainId)

        await ride.populate('captain')
        await ride.populate('user')
        console.log(ride)

        sendMessageToSocket(ride.user.socketID, {
            event: 'rideAccepted',
            data: ride
        });

        return res.status(200).json({
            success: true,
            message: "Ride accepted successfully"
        });
    } catch (error) {
        console.error("Unable to accept ride", error);
        return res.status(500).json({
            success: false,
            error: error.message || error
        });
    }

}

module.exports.startRide = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucess: false,
            errors: errors.array()
        })
    }

    const { rideId, otp } = req.body

    try {
        const validatedRide = await rideService.validateOTP(rideId, otp)
        await validatedRide.populate('user')
        await validatedRide.populate('captain')

        console.log(validatedRide)

        sendMessageToSocket(validatedRide.user.socketID, {
            event: 'rideStarted',
            data: validatedRide
        })

        return res.status(200).json({
            success: true,
            validatedRide
        })
    } catch(error) {
        console.error("Unable to start ride", error);
        return res.status(500).json({
            success: false,
            error: error.message || error
        });
    }
}

module.exports.completeRide = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucess: false,
            errors: errors.array()
        })
    }

    const { rideId } = req.body

    try {
        const ride = await rideService.finishRide(rideId)
        await ride.populate('user')

        sendMessageToSocket(ride.user.socketID, {
            event: 'rideCompleted'
        })

        return res.status(200).json({
            success: true,
            message: "Ride completed successfully"
        })
    } catch (error) {
        console.error("Unable to complete ride", error);
        return res.status(500).json({
            success: false,
            error: error.message || error
        })
    }


}

module.exports.cancelRide = async (req, res, next) => {

}