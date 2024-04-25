const mongoose = require('mongoose')
const schema = mongoose.Schema

const review = new schema({
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant'
    },
    reviewer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comments: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Review', review)
