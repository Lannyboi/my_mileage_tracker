const express = require('express')
const dbHelpers = require('../models/dbHelpers')
const bcrypt = require('bcryptjs')

const router = express.Router()

// All endpoints are for /api/register
router.get('/', (req, res) => {
    res.status(200).json({ message: "Register page" })
})

router.post('/', (req, res) => {
    const newAccount = req.body;
    const { username, password, confirmPassword } = newAccount;

    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ message: "Username, password, and confirmation of password are required" });
    }

    dbHelpers.findUserByUsername(username)
        .then(existingUsername => {
            if (existingUsername && existingUsername.username === newAccount.username) {
                return res.status(409).json({ message: "Username already exists" });
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }

            // Hash and add newAccount
            const hashedPassword = bcrypt.hashSync(newAccount.password, 12);
            newAccount.password = hashedPassword;

            dbHelpers.addUser(newAccount.username, newAccount.password)
                .then(newUser => {
                    // Creates session and sends a success response
                    req.session.isLoggedIn = true;
                    req.session.user_id = newUser.id
                    res.send({ message: "Added new user" });
                })
                .catch(error => {
                    return res.status(500).json({ message: "Failed to add new account" });
                });
        })
        .catch(error => {
            return res.status(500).json({ message: "Failed to add new account" });
        });
});

module.exports = router