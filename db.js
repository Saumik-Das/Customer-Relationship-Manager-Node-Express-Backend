const mongoose = require('mongoose');
const config = require('./config')
const mongoURI = config.mongoURI;

const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;