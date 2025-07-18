const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minLength: [3, "Lirst name must be alteast 3 character long"]
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
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [0, 0]
        }
    }
})

userSchema.index({ location: '2dsphere' });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    return token
}

userSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compare(password, this.password)
    return result
}

userSchema.statics.hashPassword = async function (password) {
    const hashed = await bcrypt.hash(password, 10)
    return hashed
}

const userModel = mongoose.model('users', userSchema)

module.exports = userModel