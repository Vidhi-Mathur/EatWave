const mongoose = require('mongoose')
const schema = mongoose.Schema

const cart = new schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [{
        item: {
            type: mongoose.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            required: true
        }
    }]
})

module.exports = mongoose.model('Cart', cart)