const mongoose = require('mongoose')
const schema = mongoose.Schema

const review = new schema({
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    reviewer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comments: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Review', review)
