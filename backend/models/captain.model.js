const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minLength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    socketID: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: [true, "Color is required"]
        },
        number: {
            type: String,
            required: [true, "Number is required"],
            unique: [true, "Number must be unique"]
        },
        capacity: {
            type: Number,
            required: [true, "Capacity is required"],
            min: [1, "Capacity must be at least 1"]
        },
        type: {
            type: String,
            required: [true, "Type is required"],
            enum: ['car', 'bike', 'auto']
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0]
        }
    }
})

captainSchema.index({ location: '2dsphere' });

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    return token
}

captainSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password)
    return result
}

captainSchema.statics.hashPassword = async function (password) {
    const hashed = await bcrypt.hash(password, 10)
    return hashed
}

const captainModel = mongoose.model('captains', captainSchema);

module.exports = captainModel;