const mongoose = require('mongoose')
const schema = mongoose.Schema

const menu = new schema({
    items: [{
        name: {
            type: 'String',
            required: true
        },
        description: {
            type: 'String',
            required: true
        },
        price: {
            type: 'Number',
            required: true
        },
        foodTags: [{
            type: 'String',
            enum: ['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Spicy', 'Non-Spicy', 'Mild-Spicy'],
            required: true
        }]
    }],
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        default: null
    }
})

module.exports = mongoose.model('Menu', menu)