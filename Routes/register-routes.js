const express = require('express')
const Cars = require('../models/dbHelpers')
const bcrypy = require('bcryptjs')

const router = express.Router()

// All endpoints are for /api/register
router.post('/', (req, res) => {
    res.status(200).json({ message: "Register page"})
})

module.exports = router