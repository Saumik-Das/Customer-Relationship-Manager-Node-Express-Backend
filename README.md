# Customer-Relationship-Manager-Node-Express-Backend

## Project Idea
https://www.crio.do/projects/project-crm-spring/

## Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies.
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`.
- Create a .env file to store the required variables.
- `node index.js` to start the local server.

## Code Overview

### Dependencies
- [bcrypjs](https://www.npmjs.com/package/bcryptjs) - A package for protecting sensitive informations.
- [cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables
- [express](https://www.npmjs.com/package/express) - The server for handling and routing HTTP requests.
- [express-validator](https://www.npmjs.com/package/express-validator) - An express.js middleware for validator.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An authentication package for securely transferring information.
- [mongoose](https://www.npmjs.com/package/mongoose) - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

### Application Structure
- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `db.js` - The file to connect to establish a connction to mongo.
- `config.js` - This file loads the environment variables from the .env file.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `middleware/` - This folder contains the required middlewares for our routes.

### Error Handling 
The error handling is configured in the individual routes. Express validator is used for validating the integrity of the information supplied by the user.

### Authentication
Requests are authenticated using the help of JWT.








