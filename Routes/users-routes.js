const express = require('express')
const Cars = require('../models/dbHelpers')
const bcrypy = require('bcryptjs')

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
    const credentials = req.body
    const { username, password } = credentials

    if (!(username && password)) 
    {
        return res.status(400).json({ message: "Username and password required" })
    }

    // Hashes password
    const hash = bcrypy.hashSync(credentials.password, 12)
    credentials.password = hash

    Cars.addUser(credentials)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        // Check the error code for a unique constraint violation
        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE constraint failed'))
        {
            res.status(400).json({ message: 'Username already exists.' });
        }
        else
        {
            res.status(500).json({ message: 'Could not add user.' });
        }
    })
})

router.post("/login", (req, res) => {
    const { username, password } = req.body

    if (!(username && password)) 
    {
        return res.status(400).json({ message: "Username and password required" })
    }

    Cars.findUserByUsername(username)
    .then(user => {
        if (user && bcrypy.compareSync(password, user.password))
        {
            res.status(200).json({ message: `${user.username}` })
        }
        else
        {
            res.status(401).json({ message: "Invalid credentials" })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router