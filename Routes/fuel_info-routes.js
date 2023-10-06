const express = require('express')
const Cars = require('../models/dbHelpers')

const router = express.Router()

// All endpoints are for /api/fuel_info
router.get('/', (req, res) => {
    Cars.findFuel_info()
    .then(fuel_info => {
        res.status(200).json(fuel_info)
    })
    .catch(error => {
        res.status(500).json({ message: "Could not get fuel_info" })
    })
})

router.post('/:carId', (req, res) => {
    const { carId } = req.params

    Cars.addFuel_info(carId, req.body)
    .then(fuel_info => {
        res.status(200).json(fuel_info)
    })
    .catch(error => {
        res.status(500).json({ message: "Could not add fuel_info" })
    })
})

module.exports = router