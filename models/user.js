const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model('Exampleuser', userSchema); /// MongoDB will automatically make user to users (i.e) Plural



module.exports = {
    User

}