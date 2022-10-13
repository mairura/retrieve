const mongoose = require("mongoose");


const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        unique: true
    }
});

const person = mongoose.model("userForm", user);

module.exports = person;