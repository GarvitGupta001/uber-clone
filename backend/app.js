const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connect = require('./utils/db.utils')
const userRoutes = require('./routes/user.routes')

dotenv.config()

const app = express()

connect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({
        message: 'server running',
        status: 200
    })
})

app.use('/user', userRoutes)

module.exports = app