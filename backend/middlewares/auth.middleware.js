const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token){
        return res.status(401).json({ error: 'Unauthorised access' });
    }
    const isBlaklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlaklisted) {
        return res.status(401).json({ error: 'Unauthorised access' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ error: 'Unauthorised access' });
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorised access' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorised access' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ error: 'Unauthorised access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded.id);
        if (!captain) {
            return res.status(401).json({ error: 'Unauthorised access' });
        }

        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorised access' });
    }
}