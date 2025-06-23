const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
    const hashedPassword = await captainModel.hashPassword(password);

    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email: email,
            password: hashedPassword,
            vehicleColor: vehicle.color,
            vehicleNumber: vehicle.number,
            vehicleCapacity: vehicle.capacity,
            vehicleType: vehicle.type
        });
        const token = captain.generateAuthToken();
        res.cookie('token', token);

        return res.status(201).json({ token, captain }); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email: email }).select('+password');
    if (!captain) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    
    const token = captain.generateAuthToken();
    res.cookie('token', token);
    
    return res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token: token });
    return res.status(200).json({ message: "Captain logged out successfully" });
}