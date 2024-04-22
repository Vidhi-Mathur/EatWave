require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authentication-route')

//Setting views
app.use(bodyParser.json())

//Forwarding
app.use('/', authRoutes)

//Error Handling
app.use((err, req, res, next) => {
    const code = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error'; 
    return res.status(code).json({ message: message });
});
//Listening to server
mongoose.connect(process.env.URI).then(() => app.listen(3000)).catch((err) => console.log(err))