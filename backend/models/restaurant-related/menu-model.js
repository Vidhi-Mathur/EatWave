const mongoose = require('mongoose')
const schema = mongoose.Schema

const menu = new schema({
    item: {
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
        enum: ['Vegan', 'Vegetarian', 'Non-Vegetarian', 'spicy', 'non-spicy', 'mild-spicy'],
        required: true
    }],
    category: [{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
})

module.exports = mongoose.model('Menu', menu)