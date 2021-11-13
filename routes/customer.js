const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Customer = require('../models/Customer');
const fetchUser = require('../middleware/fetchUser');

// Route 1 Get all the customers || /api/customers/getallcustomers || Login required
router.get('/', fetchUser, async (req, res) => {
    try {

        // Get the customer details owned by the correct user
        const customerDetails = await Customer.find({ user: req.user.id });
        res.json(customerDetails);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

    }
});

// Route 2 Add a new customer || /api/customers/addcustomer || Login required
router.post('/', fetchUser, [
    // Validation to see if the user added the correct customer details
    body('customerFirstName', 'Enter a valid first name').isLength({ min: 3 }),
    body('customerLastName', 'Enter a valid last name').isLength({ min: 3 }),
    body('customerEmailId', 'Enter a valid last name').isEmail(),
], async (req, res) => {
    try {

        // Details are destructured
        const { customerFirstName, customerLastName, customerEmailId } = req.body;
        // If there are errors return bad request and the errors
        const errors = validationResult(req);
        // Errors if present are returned which are checked in the validation
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array });
        }
        // After checking if any errors are present a new customer is created
        const customerDetails = new Customer({
            // user id is required for identifying the owner of a particular customer database
            // we get this user id from the middleware fetchUser
            customerFirstName, customerLastName, customerEmailId, user: req.user.id
        });
        // Details are saved with the save() function of mongoose
        const savedCustomerDetails = await customerDetails.save();
        res.json(savedCustomerDetails);
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

    };
});
// Route 3 Update an existing customer || /api/customers/updatecustomer || Login required
router.put('/:id', fetchUser, async (req, res) => {
    try {

        const { customerFirstName, customerLastName, customerEmailId } = req.body;
        // Create a new Customer
        const newCustomer = {};
        if (customerFirstName) { newCustomer.customerFirstName = customerFirstName };
        if (customerLastName) { newCustomer.customerLastName = customerLastName };
        if (customerEmailId) { newCustomer.customerEmailId = customerEmailId };
        // Finding the customer to be updated and update it
        let customer = await Customer.findById(req.params.id);
        // Checking if the customer exists
        if (!customer) { return res.status(404).send('Status not found') };
        // Checking the user
        if (customer.user.toString() !== req.user.id) {
            return res.status(401).send('Forbidden');
        }
        // After the above checks the customer exists and the user is authorized to update the customer details.
        customer = await Customer.findByIdAndUpdate(req.params.id, { $set: newCustomer }, { new: true });
        res.json(customer);

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

    };


});
// Route 4 Delete an existing customer || /api/customers/deletecustomer || Login required
router.delete('/:id', fetchUser, async (req, res) => {
    try {

        // Finding the customer to be deleted and delete it
        let customer = await Customer.findById(req.params.id);
        // Checking if the customer exists
        if (!customer) { return res.status(404).send('Status not found') };
        // Checking the user. Allow deletion only if the user owns the customer details
        if (customer.user.toString() !== req.user.id) {
            return res.status(401).send('Forbidden');
        }
        // After the above checks the customer exists and the user is authorized to delete the customer details.
        customer = await Customer.findByIdAndDelete(req.params.id);
        res.json({ "success": "Customer details has been deleted", customer });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal server error");

    };


})
module.exports = router;