require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
//http server using express app
const server = http.createServer(app)
//Initialising and configuring socket.io with http server
const io = new Server(server, {
    cors: {
        origin: `${process.env.CLIENT_URL}`, 
        methods: ["GET", "POST"], 
        allowedHeaders: ["Authorization"], 
        credentials: true 
    }
});
const authRoutes = require('./routes/user-related/authentication-route')
const restaurantRoute = require('./routes/restaurant-related/restaurant-route')
const menuRoute = require('./routes/restaurant-related/menu-route')
const orderRoute = require('./routes/shared/order-route')
const reviewRoute = require('./routes/shared/review-route')
const searchRoute = require('./routes/user-related/search-route')
const { fileUpload, upload } = require('./util/file-upload')
const { authorizationMiddleware } = require('./controllers/user-related/authentication-controller')
const { cloudinaryDelete } = require('./util/cloudinary')

app.use(cors({
    origin: `${process.env.CLIENT_URL}`
}))

//Parsing JSON bodies
app.use(express.json({limit: '50mb'}))

//Parsing URL-encoded bodies
app.use(express.urlencoded({extended: true, limit: '50mb'}))

//Connecting
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        //No action needed
    });
});

//Passing socket.io to the routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

//Forwarding
app.use('/', authRoutes)
app.use('/restaurant/menu', menuRoute)
app.use('/restaurant', restaurantRoute)
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
mongoose.connect(process.env.MONGODB_URI).then(() => server.listen(3000)).catch((err) => console.log(err))