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
        select: false
    },
    sockeID: {
        type: String,

    }
})

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET)
    return token
}

userSchema.methods.comparePassword = async (password) => {
    const result = await bcrypt.compare(password, this.password)
    return result
}

userSchema.statics.hashPassword = async (password) => {
    const hashed = await bcrypt.hash(password, 10)
    return hashed
}

const userModel = mongoose.model('users', userSchema)

module.exports = userModel