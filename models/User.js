const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
      },
    password: {
        type: String,
        required: true
      },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User