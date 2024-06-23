
const mongoose = require('mongoose')
const schema = mongoose.Schema

const restaurant = new schema({
    restaurantName: {
        type: String,
        required: true
    },
    ownerName: {
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
        postalCode: Number,
    },
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    },
    workingDays: {
        type: [String],
        required: true
    },
    packagingCharges: {
        type: Number,
        default: 0
    },
    accountNumber: {
        type: Number,
        required: true
    },
    fssai: {
        type: Number,
        required: true
    },
    foodType: {
        type: String,
        enum: ['veg', 'both'],
        required: true
    },
    cuisine: {
        type: [String],
        required: true
    },
    menu: {
        type: mongoose.Schema.ObjectId,
        ref: 'Menu',
        required: true
    },
    pastOrders: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        default: null
    }],
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: 'Review',
        default: null
    }],
    imageUrls: {
        type: [String],
        default: ['https://res.cloudinary.com/dzczgjlxt/image/upload/restaurant_images/a5tnypq7zhlmpehaebje.png']
    }
})

module.exports = mongoose.model('Restaurant', restaurant)