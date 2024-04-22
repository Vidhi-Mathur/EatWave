const express = require('express')
const router = express.Router()
const authController = require('../controllers/authentication-controller')

//POST /eatwave/signup
router.post('/signup', authController.postSignup)

//POST /eatwave/login
router.post('/login', authController.postLogin)

//POST /eatwave/logout
router.post('/logout', authController.postLogout)

module.exports = router