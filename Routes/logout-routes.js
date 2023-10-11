const express = require('express')
const Cars = require('../models/dbHelpers')

const router = express.Router()

// All endpoints are for /api/logout
router.post('/', (req, res) => {
    res.status(200).json({ message: "logout page" })
})

module.exports = router
