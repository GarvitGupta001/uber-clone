const { default: axios } = require("axios")
const captainModel = require('../models/captain.model')

module.exports.getCoordinates = async (placeId) => {
    const key = process.env.GOOGLE_MAPS_API_KEY
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${key}`;
    const response = await axios.get(url);

    if (response.data.status === 'OK') {
        const location = response.data.result.geometry.location;
        return {
            lat: location.lat,
            lng: location.lng
        };
    } else {
        throw new Error("Place not found: " + response.data.status);
    }
}

module.exports.getDistanceTime = async (source, destination) => {
    const key = process.env.GOOGLE_MAPS_API_KEY
    if (!source || !destination) {
        throw new Error("Origin and Destination required.")
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=place_id:${destination}&origins=place_id:${source}&units=metric&key=${key}`

    try {
        const response = await axios.get(url)
        if (response.data.status == 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No Routes Found')
            }

            const { distance, duration } = response.data.rows[0].elements[0]

            return { distance, duration }
        }

        throw new Error(response.data.status)
    } catch (error) {
        throw new Error(error);
    }
}

module.exports.getSuggestions = async (search) => {
    const key = process.env.GOOGLE_MAPS_API_KEY
    if (!search) {
        throw new Error("search query is required")
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${key}&components=country:in`

    try {
        const response = await axios.get(url)
        return response.data.predictions
    } catch (error) {
        throw new Error(error)
    }
}