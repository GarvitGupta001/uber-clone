const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').trim().notEmpty().isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').trim().notEmpty().isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body('password').trim().notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body('vehicle.color').trim().notEmpty().withMessage("Vehicle color is required"),
    body('vehicle.number').trim().notEmpty().withMessage("Vehicle number is required"),
    body('vehicle.capacity').isInt({ gt: 0 }).withMessage("Vehicle capacity must be a positive integer"),
    body('vehicle.type').trim().notEmpty().withMessage("Vehicle type is required")
], captainController.registerCaptain);

router.post('/login', [
    body('email').trim().notEmpty().isEmail().withMessage("Invalid Email"),
    body('password').trim().notEmpty().isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router