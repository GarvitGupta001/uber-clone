const mapService = require('../services/map.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { placeId } = req.query
    try {
        const coordinates = await mapService.getCoordinates(placeId)
        return res.status(200).json({
            success: true,
            coordinates
        })
    } catch (error) {
        console.error("error getting coordinates", error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucess: false,
            errors: errors.array()
        })
    }

    const { source, destination } = req.query
    try {
        const { distance, duration } = await mapService.getDistanceTime(source, destination)
        return res.status(200).json({
            success: true,
            distance,
            duration
        })
    } catch (error) {
        console.error("Error getting distance and time", error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}

module.exports.getSuggestions = async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            sucess: false,
            errors: errors.array()
        })
    }

    const { search } = req.query

    try {
        const suggestions = await mapService.getSuggestions(search)
        return res.status(200).json({
            success: true,
            out_len: suggestions.length,
            suggestions
        })
    } catch (error) {
        console.error("Error getting suggestions", error)
        return res.status(500).json({
            success: false,
            error
        })
    }
}