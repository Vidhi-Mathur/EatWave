require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/user-related/authentication-route')
const restaurantRoute = require('./routes/restaurant-related/restaurant-route')
const menuRoute = require('./routes/restaurant-related/menu-route')
const orderRoute = require('./routes/shared/order-route')
const reviewRoute = require('./routes/shared/review-route')
const cartRoute = require('./routes/user-related/cart-route')
const searchRoute = require('./routes/user-related/search-route')
const { fileUpload, upload } = require('./util/file-upload')
const { authorizationMiddleware } = require('./controllers/user-related/authentication-controller')
const { cloudinaryDelete } = require('./util/cloudinary')

app.use(cors({
    origin: 'http://localhost:3001'
}))

//Parsing JSON bodies
app.use(express.json({limit: '50mb'}))

//Parsing URL-encoded bodies
app.use(express.urlencoded({extended: true, limit: '50mb'}))

//Forwarding
app.use('/', authRoutes)
app.use('/restaurant/menu', menuRoute)
app.use('/restaurant', restaurantRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)
app.use('/review', reviewRoute)
app.use('/search', searchRoute)
app.post('/upload-image', authorizationMiddleware, upload.array('images', 10), fileUpload);
app.post('/delete-image', authorizationMiddleware, cloudinaryDelete)

//Serving statically
app.use('/uploads/images', express.static('uploads/images'))

//Error Handling
app.use((err, req, res, next) => {
    const code = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    return res.status(code).json({ message: message });
});
//Listening to server
mongoose.connect(process.env.URI).then(() => app.listen(3000)).catch((err) => console.log(err))