// Where we write out knex queries
const db = require('../dbConfig')

module.exports = {
    // Users
    findUsers,
    addUser,

    // Cars
    findCars,
    addCar,

    // Fuel_info
    findFuel_info,
    addFuel_info
}

function findUsers() {
    return db('users')
}

async function addUser(user) {
    return await db('users')
        .insert(user, ["id", "username", "password"])
}

function findCars() {
    return db('cars')
}

async function addCar(userId, car) {
    car.user_id = userId

    return await db('cars')
        .insert(car, ['id'])
}

function findFuel_info() {
    return db('fuel_info')
}

async function addFuel_info(carId, fuel_info) {
    fuel_info.car_id = carId

    return db('fuel_info')
        .insert(fuel_info, ['id'])
}