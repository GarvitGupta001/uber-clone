const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connect = require('./utils/db.utils')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')

dotenv.config()

const app = express()

connect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json({
        message: 'server running',
        status: 200
    })
})

app.use('/user', userRoutes)
app.use('/captain', captainRoutes)

module.exports = app