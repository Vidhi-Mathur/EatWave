const mongoose = require('mongoose')
const schema = mongoose.Schema

const user = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pastOrders: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        default: null
    }]
})

module.exports = mongoose.model('User', user)