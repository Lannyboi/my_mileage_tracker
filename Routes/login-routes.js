const express = require('express')
const dbHelpers = require('../models/dbHelpers')
const bcrypt = require('bcryptjs')

const router = express.Router()

// All endpoints are for /api/login
router.get('/', (req, res) => {
    res.status(200).json({ message: "Register page" })
})

router.post('/', (req, res) => {
    const login = req.body
    const { username, password } = login
    console.log(req.body)
    dbHelpers.findUserByUsername(login.username)
    .then(user => {
        if (user && bcrypt.compareSync(login.password, user.password))
        {
            req.session.isLoggedIn = true;
            req.session.user_id = user.id
            res.status(200).json({ message: `Login successful` })
        }
        else
        {
            res.status(401).json({ message: "Invalid credentials"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to find user" })
    })
})

module.exports = router