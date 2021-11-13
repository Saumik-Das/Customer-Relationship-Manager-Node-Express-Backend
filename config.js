require('dotenv').config();


const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    port: port,
    mongoURI:mongoURI,
    jwtSecret: jwtSecret,
}