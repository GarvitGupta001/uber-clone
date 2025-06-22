const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const { body, validationResult } = require('express-validator')

router.post('/register', [
    body('email').trim().notEmpty().isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').trim().notEmpty().isLength({ min: 3 }).withMessage("First name must be atleast 3 characters long"),
    body('password').trim().notEmpty().isLength({ min: 8 }).withMessage("Password must be atleast 8 characters long")
],
    userController.registerUser
)

module.exports = router