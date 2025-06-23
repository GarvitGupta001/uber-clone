const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstname, lastname, email, password, vehicleColor, vehicleNumber, vehicleCapacity, vehicleType }) => {
    if (!firstname || !lastname || !email || !password || !vehicleColor || !vehicleNumber || !vehicleCapacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    const captain = new captainModel({
        fullname: {
            firstName: firstname,
            lastName: lastname
        },
        email,
        password: password,
        vehicle: {
            color: vehicleColor,
            number: vehicleNumber,
            capacity: vehicleCapacity,
            type: vehicleType
        }
    });
    await captain.save();
    return captain;
}