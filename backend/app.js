require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRoutes = require('./routes/user-related/authentication-route')
const restaurantRoute = require('./routes/restaurant-related/restaurant-route')
const menuRoute = require('./routes/restaurant-related/menu-route')
const orderRoute = require('./routes/shared/order-route')

//Setting views
app.use(bodyParser.json())

//Forwarding
app.use('/', authRoutes)
app.use('/restaurant/menu', menuRoute)
app.use('/restaurant', restaurantRoute)
app.use('/order', orderRoute)

//Error Handling
app.use((err, req, res, next) => {
    const code = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    return res.status(code).json({ message: message });
});
//Listening to server
mongoose.connect(process.env.URI).then(() => app.listen(3000)).catch((err) => console.log(err))