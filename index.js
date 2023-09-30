require('dotenv').config()

const express = require('express')
const Cars = require('./models/dbHelpers')

const server = express()

server.use(express.json())

const port = process.env.PORT || 5000

server.get("/", (req, res) => {
    res.status(200).json({ message: "I'll rizz your mum" })
})

server.get("/api/cars/:id", (req, res) => {
    const { id } = req.params

    Cars.findCarById(id)
    .then(car => {
        if (car)
        {
            res.status(200).json(car)
        }
        else
        {
            res.status(404).json({ message: "Car not found" })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Unable to perform opperation" })
    })
})

server.get("/api/cars", (req, res) => {
    Cars.findCar()
    .then(cars => {
        res.status(200).json(cars)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post("/api/cars", (req, res) => {
    Cars.add(req.body)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        res.status(500).json({ message: "Cannot add car" })
    })
})

server.delete("/api/cars/:id", (req, res) => {
    const { id } = req.params

    Cars.removeCar(id)
    .then(count => {
        if (count)
        {
            res.status(200).json({ message: "Successfully deleted" })
        }
        else
        {
            res.status(404).json({ message: "Unable to locate record" })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post("/api/cars/:id/fuel_info", (req, res) => {
    const { id } = req.params
    const fuel_info = req.body

    // If fuel info has no car_id
    // Add a car_id = the id param
    if (!fuel_info.car_id)
    {
        fuel_info["car_id"] = parseInt(id, 10)
    }

    Cars.findCarById(id)
    .then(car => {
        if (!car)
        {
            res.status(404).json({ message: "Invalid id" })
        }

        // Check that all required fields are filled
        if (!(fuel_info.month || fuel_info.day || fuel_info.total_miles || fuel_info.miles_travled_on_tank || fuel_info.price_per_gallon || fuel_info.total_gallons))
        {
            res.status(400).json({ message: "Must provide all values" })
        }

        Cars.addFuelInfo(fuel_info, id)
        .then(car => {
            if (fuel_info)
            {
                res.status(200).json(fuel_info)
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Failed to add fuel info" })
        })
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.get("/api/cars/:id/fuel_info", (req, res) => {
    const { id } = req.params

    Cars.findCarFuelInfo(id)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        res.status(500).json({ message: "Error retrieving fuel info" })
    })
})

server.delete("/api/fuel_info/:id", (req, res) => {
    const { id } = req.params

    Cars.removeFuelInfo(id)
    .then(count => {
        if (count > 0)
        {
            res.status(200).json({ message: `fuel info deleted` })
        }
        else
        {
            res.status(404).json({ message: "There is no fuel info with that id" })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "Error deleting fuel info" })
    })
})

server.listen(port, () => {
    console.log(`\n*** Server running on port ${port} ***\n`)
})