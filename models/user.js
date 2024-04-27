const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum : ['male', 'female']
    },
    password: {
        type: String,
        required: true,
    },
    profileImage : {
        type: String,
    }
})

const User = mongoose.model('user', userSchema );


module.exports = User;