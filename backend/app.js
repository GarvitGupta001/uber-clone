const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const connect = require('./utils/db.utils')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const mapRoutes = require('./routes/map.routes')
const rideRoutes = require('./routes/ride.routes')

dotenv.config()

const app = express()

connect()

app.use(morgan('dev'))
app.use(cors({
    origin: ['https://uber-clone-indol-gamma.vercel.app', 'http://localhost:5173'],
    credentials: true
}))
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
app.use('/map', mapRoutes)
app.use('/ride', rideRoutes)

module.exports = app