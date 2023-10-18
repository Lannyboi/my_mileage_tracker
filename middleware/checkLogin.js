function ifLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) {
        next(); // User is logged in, proceed to the next route handler
    } else {
        res.status(401).json({ message: "Unauthorized" }) // User is not logged in, send a 401 Unauthorized response
    }
}

module.exports = ifLoggedIn