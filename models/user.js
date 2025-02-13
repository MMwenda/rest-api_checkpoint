const mongoose = require('mongoose');

//creating a schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);
//users collection