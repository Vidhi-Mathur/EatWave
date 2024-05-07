require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer')
const authRoutes = require('./routes/user-related/authentication-route')
const restaurantRoute = require('./routes/restaurant-related/restaurant-route')
const menuRoute = require('./routes/restaurant-related/menu-route')
const orderRoute = require('./routes/shared/order-route')
const reviewRoute = require('./routes/shared/review-route')
const cartRoute = require('./routes/user-related/cart-route')
const cors = require('cors')

//Handling file storage
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        //First argument null, to deal with nodeJs error handling, second being folder saved into
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.fieldname)
    }
})

//File type
const fileType = (req, file, cb) => {
    if(file.mimeType === 'image/png' || file.mimeType === 'image/jpg' || file.mimeType === 'image/jpeg') cb(null, true)
    else cb(null, false)
}

//Parsing JSON bodies
app.use(express.json())

//Parsing URL-encoded bodies
app.use(express.urlencoded({extended: true}))

app.use(multer({storage: fileStorage ,fileFilter: fileType}).single('image'))

app.use(cors())

//Forwarding
app.use('/', authRoutes)
app.use('/restaurant/menu', menuRoute)
app.use('/restaurant', restaurantRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)
app.use('/review', reviewRoute)

//Error Handling
app.use((err, req, res, next) => {
    const code = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    return res.status(code).json({ message: message });
});
//Listening to server
mongoose.connect(process.env.URI).then(() => app.listen(3000)).catch((err) => console.log(err))