const express = require('express')
const router = express.Router()
const mapController = require('../controllers/map.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const { query } = require('express-validator')

router.get('/coordinates',
    query('placeId').isString(),
    authMiddleware.authUser,
    mapController.getCoordinates
)

router.get('/distance-time',
    query('source').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getDistanceTime
)

router.get('/suggestions',
    query('search').isString().notEmpty(),
    authMiddleware.authUser,
    mapController.getSuggestions
)

module.exports = router