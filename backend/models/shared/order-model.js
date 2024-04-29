const mongoose = require('mongoose')
const schema = mongoose.Schema

const order = new schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref:  'Restaurant',
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
    }],
    totalCost: {
        type: Number,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String
    },
    status: {
        type: String,
        enum: ['Placed', 'Confirmed', 'Preparing', 'On the way', 'Delivered', 'Cancelled'],
        default: 'Placed'
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', order)