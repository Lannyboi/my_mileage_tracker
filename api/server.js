const express = require('express')

const carsRouter = require('../Routes/cars-routes')
const fuelInfoRouter = require('../Routes/fuel_info-routes')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.json({ message: "Hello, world"})
})

server.use('/api/cars', carsRouter)
server.use('/api/fuel_info', fuelInfoRouter)

module.exports = server