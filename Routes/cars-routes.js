const express = require('express')
const Cars = require('../models/dbHelpers')

const router = express.Router()

// All endpoints are for /api/cars
router.get('/', (req, res) => {
    Cars.findCars()
    .then(cars => {
        res.status(200).json(cars)
    })
    .catch(error => {
        res.status(500).json({ message: "Could not get cars" })
    })
})

router.post('/:userId', (req, res) => {
    const { userId } = req.params

    Cars.addCar(userId ,req.body)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        res.status(500).json({ message: "Could not add car" })
    })
})

module.exports = router