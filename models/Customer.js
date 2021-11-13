const mongoose = require('mongoose');
const {Schema} = mongoose;

const CustomerSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    customerFirstName:{
        type: String,
        required: true
    },
    customerLastName:{
        type: String,
        required: true
    },
    customerEmailId:{
        type: String, 
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('customers', CustomerSchema);