const express = require('express')

const carsRouter = require('../Routes/cars-routes')
const fuelInfoRouter = require('../Routes/fuel_info-routes')

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "I'll rizz your mum"})
})

server.use('/api/cars', carsRouter)
server.use('/api/fuel_info', fuelInfoRouter)

module.exports = server