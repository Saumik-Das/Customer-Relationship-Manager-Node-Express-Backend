const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');
const fetchUser = require('../middleware/fetchUser');


// Route 1 : Creating a User || POST "/api/auth/createuser" || No Login required


router.post('/createuser', [
    // validation to see if the user added the correct details
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // If there are errors return the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Errors if present are returned which are checked in the validation
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {

        // Check if the user with the same email already exists.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
        }
        // salt is generated
        const salt = await bcrypt.genSalt(10);
        // hash function is used to generate a hashed password
        securedPassword = await bcrypt.hash(req.body.password, salt);
        // create a new user with the create() function in mongoose
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        });
        // user id which is generated when the user is created is stored in a variable
        const data = {
            user: {
                id: user.id
            }
        }
        // sign() function is used to generate a token
        const authToken = jwt.sign(data, config.jwtSecret);
        console.log(authToken);

        success = true;
        res.json({success, authToken });
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

    }
});

// Route 2 : Authenticate a user || POST "api/auth/login" || No Login required


router.post('/login', [
    // validation to see if the user entered correct details
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    let success = false;
    // destructured
    const { email, password } = req.body;
    try {

        // check to see if the email exists and if it doesn't return an error
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Please try to login with correct credentials" });
        }
        // compare function is used to compare the password entered and the password stored in the database
        const passwordCompare = await bcrypt.compare(password, user.password);
        // bcrypt.compare() returns a binary value. If it is false return an error
        if (!passwordCompare) {
            return res.status(400).json({ success, errors: "Please try to login with correct credentials" });
        }

        success = true;
        // user id is stored in a variable
        const data = {
            user: {
                id: user.id
            }
        }
        // a token is generated
        const authToken = jwt.sign(data, config.jwtSecret, {expiresIn:'30m'}); //Token expires in 30 minutes
        res.json({success, authToken});

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

    }

});

// ROUTE 3 : Get user details || POST "api/auth/getuser" || Login required
router.post('/getuser', fetchUser, async (req, res) => {
    try {

        // user id is fetched from the fetchUser middleware
        userId = req.user.id;
        // user is found by the id and the details are selected except the password
        const user = await User.findById(userId).select('-password');
        res.send(user);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

    }
});
module.exports = router;