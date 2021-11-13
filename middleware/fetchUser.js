const jwt = require('jsonwebtoken');
const config = require('../config');

const fetchUser = (req, res, next) => {
    // Getting the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    // checking if a token is there at all
    if (!token) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        // verification is done here taking in the supplied token
        const data = jwt.verify(token, config.jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
}

module.exports = fetchUser;