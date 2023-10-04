// Where we write out knex queries
const db = require('../dbConfig')

module.exports = {
    findUsers,
    addUser
}

function findUsers() {
    return db('users')
}

async function addUser(user) {
    return await db('users')
        .insert(user, ["id", "username", "password"])
}