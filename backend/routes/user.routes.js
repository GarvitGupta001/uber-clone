const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register', [
    body('email').trim().notEmpty().isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').trim().notEmpty().isLength({ min: 3 }).withMessage("First name must be atleast 3 characters long"),
    body('password').trim().notEmpty().isLength({ min: 8 }).withMessage("Password must be atleast 8 characters long")
],
    userController.registerUser
)

router.post('/login', [
    body('email').trim().notEmpty().isEmail().withMessage("Invalid Email"),
    body('password').trim().notEmpty().isLength({ min: 8 }).withMessage("Password must be atleast 8 characters long")
],
    userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router