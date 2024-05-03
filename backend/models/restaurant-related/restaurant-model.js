const mongoose = require('mongoose')
const schema = mongoose.Schema

const restaurant = new schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String
    },
    openingHours: {
        type: Map,
        of: String
    },
    workingDays: {
        type: Map,
        of: String
    },
    menu: {
        type: mongoose.Schema.ObjectId,
        ref: 'Menu',
        required: true
    },
    paymentMethods: [[{
        type: String,
        enum: ['Cash', 'Credit-Card', 'Debit-Card', 'UPI', 'Net-Banking']
    }]],
    deliveryCharges: {
        type: Number,
        default: 0
    },
    pastOrders: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        default: null
    }],
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = mongoose.model('Restaurant', restaurant)