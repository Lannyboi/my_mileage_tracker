// Node_modules 
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const SQLiteStore = require("connect-sqlite3")(session)

// Routes
const registerRouter = require('../Routes/register-routes')
const loginRouter = require('../Routes/login-routes')
const logoutRouter = require('../Routes/logout-routes')
const carsRouter = require('../Routes/cars-routes')
const fuelInfoRouter = require('../Routes/fuel_info-routes')

// Middleware
const checkIfLoggedIn = require('../middleware/checkLogin')

// Set up server
const server = express()

// Use all modules and middleware
server.use(express.json())
server.use(cors());

// set up session
const sessionStore = new SQLiteStore({
    db: "/data/cars.sqlite3",
    concurrentDB: true
})

server.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    domain: "localhost"
}))

server.get("/", (req, res) => {
    console.log(req.session.user_id)
    res.status(200).json({ user_id: req.session.user_id })
})

// Server endpoints
// get post. For logging in
server.use('/api/login', loginRouter)
// get post. For creating accounts
server.use('/api/register', registerRouter)
// get post. For logging out
server.use('/api/logout', checkIfLoggedIn, logoutRouter)
// get, post. For adding a car and getting all cars
server.use('/api/cars', checkIfLoggedIn, carsRouter)
// get, post. For adding fuel_info entry and getting all fuel_info entries
server.use('/api/fuel_info', checkIfLoggedIn, fuelInfoRouter)

module.exports = server