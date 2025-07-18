const express = require('express')
const router = express.Router()
const { body, query } = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')
const rideController = require('../controllers/ride.controller')

router.post('/create',
    body('pickup.main_text').isString(),
    body('pickup.secondary_text').isString(),
    body('pickup.place_id').isString(),
    body('destination.main_text').isString(),
    body('destination.secondary_text').isString(),
    body('destination.place_id').isString(),
    body('vehicleType').isString().isIn(['bike', 'auto', 'car']).withMessage('vehicle should be bike, auto or car'),
    authMiddleware.authUser,
    rideController.createRide
)

router.get('/fare',
    query('pickupPlaceId').isString(),
    query('destinationPlaceId').isString(),
    authMiddleware.authUser,
    rideController.getFare
)

router.post('/accept',
    body('rideId').isString(),
    authMiddleware.authCaptain,
    rideController.acceptRide
)

router.post('/start',
    body('rideId').isString(),
    body('otp').isString().isLength({min: 4, max:4}).withMessage('otp should be of 4 digits'),
    authMiddleware.authCaptain,
    rideController.startRide
)

router.post('/finish',
    body('rideId').isString(),
    authMiddleware.authCaptain,
    rideController.completeRide
)

router.post('/cancel',
    body('rideId').isString(),
    authMiddleware.authUser,
    rideController.cancelRide
)



module.exports = router