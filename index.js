const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const config = require('./config');


// connection to mongo
connectToMongo();
const app = express();
const port = config.port;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customer'));
app.listen(port , ()=>{
    console.log(`App listening at http://localhost:${port}`);
});