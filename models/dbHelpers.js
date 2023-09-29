// Where we write out knex queries
const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

module.exports = {
    add,
    findCar,
    findCarById,
    removeCar,
    addFuelInfo,
    findCarFuelInfo
}

async function add(car) {
    const [id] = await db('cars').insert(car)

    return id
}

function findCar() {
    return db('cars')
}

function findCarById(id) {
    return db('cars')
        .where({ id })
        .first()
}

function removeCar(id) {
    return db('cars')
        .where({ id })
        .del()
}

function findFuelInfoById(id) {
    return db('fuel_info')
        .where({ id })
        .first()
}

async function addFuelInfo(fuel_info, car_id) {
    const [id] = await db('fuel_info')
        .where({ car_id })
        .insert(fuel_info)
    return findFuelInfoById(id)
}

function findCarFuelInfo(car_id) {
    return db('cars')
        .join('fuel_info', "cars.id", "fuel_info.car_id")
        .where({ car_id })
}