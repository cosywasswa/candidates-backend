const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: [String],
        default: []
    },
    tier: {
        type: Number,
    }
}, {timestamps: true})

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = Candidate