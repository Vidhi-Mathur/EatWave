const mongoose = require('mongoose')
const schema = mongoose.Schema

const category = new schema({
    name: {
        type: 'String',
        required: true,
        unique: true
    }
})

module.exports = mongoose.Schema('Category', category)