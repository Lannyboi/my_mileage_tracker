const session = require('express-session');

function ifLoggedIn(req, res, next) {
    const isLoggedIn = req.session.isLoggedIn
    if (isLoggedIn) {
        next(); // User is logged in, proceed to the next route handler
    } else {
        res.status(401).send('Unauthorized') // User is not logged in, send a 401 Unauthorized response
    }
}

module.exports = ifLoggedIn