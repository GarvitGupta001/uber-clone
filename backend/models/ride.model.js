const mongoose = require('mongoose')

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "user is required"]
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captains'
    },
    pickup: {
        main_text: {
            type: String,
            required: true,
        },
        secondary_text: {
            type: String,
            required: true
        },
        place_id: {
            type: String,
            required: true
        }
    },
    destination: {
        main_text: {
            type: String,
            required: true,
        },
        secondary_text: {
            type: String,
            required: true
        },
        place_id: {
            type: String,
            required: true
        }
    },
    fare: {
        type: Number,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        emun: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration: {
        type: Number,
    },
    distance: {
        type: Number,
    },
    otp: {
        type: String,
        required: true
    }
})

const rideModel = mongoose.model('rides', rideSchema)
module.exports = rideModel