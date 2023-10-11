const express = require('express')
const Cars = require('../models/dbHelpers')
const bcrypy = require('bcryptjs')

const router = express.Router()

// All endpoints are for /api/login
router.post('/', (req, res) => {
    res.status(200).json({ message: "login page" })
})

module.exports = router