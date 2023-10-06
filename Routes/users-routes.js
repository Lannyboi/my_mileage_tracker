const express = require('express')
const Cars = require('../models/dbHelpers')

const router = express.Router()

// For all endpoints with /api/users
router.get('/', (req, res) => {
    Cars.findUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: "Could not get users"})
    })
})

router.post("/", (req, res) => {
    Cars.addUser(req.body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        // Check the error code for a unique constraint violation
        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE constraint failed')) {
            res.status(400).json({ message: 'Username already exists.' });
        } else {
            res.status(500).json({ message: 'Could not add user.' });
        }
    })
})

module.exports = router