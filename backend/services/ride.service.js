const userModel = require('../models/ride.model')
const captainModel = require('../models/captain.model')
const rideModel = require('../models/ride.model')
const mapService = require('../services/map.service')

module.exports.createRide = async (userId, pickup, destination, fare, otp, vehicle) => {
    if (!userId || !pickup || !destination || !fare || !otp || !vehicle) {
        throw new Error("All fields are required");
    }

    try {
        const newRide = new userModel({
            user: userId,
            pickup,
            destination,
            fare,
            otp,
            vehicle
        })
        await newRide.save()
        return newRide

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getFare = async (pickup, destination) => {
    const { distance, duration } = await mapService.getDistanceTime(pickup, destination)
    const distanceInKm = distance.value / 1000;
    const durationInMin = duration.value / 60;

    const fareRates = {
        car: {
            base: 50,
            perKm: 15,
            perMin: 2
        },
        bike: {
            base: 20,
            perKm: 7,
            perMin: 1
        },
        auto: {
            base: 30,
            perKm: 10,
            perMin: 1.5
        }
    };

    // Calculate fare for each vehicle type
    const fares = {};
    for (const [vehicle, rates] of Object.entries(fareRates)) {
        fares[vehicle] = Math.round(
            rates.base +
            (rates.perKm * distanceInKm) +
            (rates.perMin * durationInMin)
        );
    }

    return fares;
}

module.exports.getNearbyCaptains = async (lat, lng, radius) => {

    if (lat == null || lng == null || radius == null) {
        throw new Error("Latitude, longitude, and radius are required")
    }

    const captains = await captainModel.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                $maxDistance: radius*1000
            }
        }
    })

    return captains
}

module.exports.acceptRide = async (rideId, captainId) => {
    if (!rideId || !captainId) {
        throw new Error("rideId and captainId are required")
    }

    const ride = await rideModel.findById(rideId)
    if (!ride) {
        throw new Error("Ride not found")
    }

    if (ride.status !== 'pending') {
        throw new Error("Ride is not available for acceptance")
    }

    ride.captain = captainId
    ride.status = 'accepted'
    await ride.save()

    return ride
}

module.exports.validateOTP = async (rideId, otp) => {
    if (!rideId || !otp) {
        throw new Error("rideId and otp are required")
    }

    const ride = await rideModel.findById(rideId)
    if (!ride) {
        throw new Error("Ride not found")
    }

    if (!ride.otp === otp) {
        throw new Error("Incorrect OTP")
    } 

    ride.status = 'ongoing'
    await ride.save()
    return ride
}

module.exports.finishRide = async (rideId) => {
    if (!rideId) {
        throw new Error("rideId is required")
    }

    const ride = await rideModel.findById(rideId)
    if (!ride) {
        throw new Error("Ride not found")
    }

    if (ride.status !== 'ongoing') {
        throw new Error("Ride is not ongoing")
    }

    ride.status = 'completed'
    await ride.save()
    return ride
}