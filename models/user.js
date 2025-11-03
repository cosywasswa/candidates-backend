const { required } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Provide name'],
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Provide password']
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User;