// Node_modules 
const express = require('express')
const cors = require('cors')
const session = require('express-session')

// Routes
const registerRouter = require('../Routes/register-routes')
const loginRouter = require('../Routes/login-routes')
const logoutRouter = require('../Routes/logout-routes')
const carsRouter = require('../Routes/cars-routes')
const fuelInfoRouter = require('../Routes/fuel_info-routes')

// Middleware
const cookieMiddleware = require('../middleware/cookie')
const checkIfLoggedIn = require('../middleware/checkLogin')

// Set up server
const server = express()

// Use all modules and middleware
server.use(express.json())
server.use(cors())
server.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: cookieMiddleware
}))

// Server endpoints
// post. For logging in
server.use('/api/login', loginRouter)
// post. For creating accounts
server.use('/api/register', registerRouter)
// post. For logging out
server.use('/api/logout', checkIfLoggedIn, logoutRouter)
// get, post. For adding a car and getting all cars
server.use('/api/cars', checkIfLoggedIn, carsRouter)
// get, post. For adding fuel_info entry and getting all fuel_info entries
server.use('/api/fuel_info', checkIfLoggedIn, fuelInfoRouter)

module.exports = server