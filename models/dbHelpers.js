// Where we write out knex queries
const db = require('../dbConfig')

module.exports = {
    // Register
    addUser,
    findUserByUsername
}

async function addUser(username, password) {
    newAccount = {
        "username": username,
        "password": password
    }
    return await db('users')
        .insert(newAccount, ['username', 'password'])
}

function findUserByUsername(username) {
    return db('users')
        .where({ username })
        .first()
}