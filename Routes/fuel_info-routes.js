const express = require('express')
const Cars = require('../models/dbHelpers')

const router = express.Router()

// All endpoints are for /api/fuel_info
router.delete("/:id", (req, res) => {
    const { id } = req.params

    Cars.removeFuelInfo(id)
    .then(count => {
        if (count > 0)
        {
            res.status(200).json({ message: `fuel info deleted` })
        }
        else
        {
            res.status(404).json({ message: "There is no fuel info with that id" })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Error deleting fuel info" })
    })
})

module.exports = router