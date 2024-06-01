const express = require('express')
const router = express.Router()
const authController = require('../../controllers/user-related/authentication-controller')

//POST /eatwave/signup
router.post('/signup', authController.postSignup)

//POST /eatwave/login
router.post('/login', authController.postLogin)

//POST /eatwave/logout
router.post('/logout', authController.postLogout)

//POST /eatwave/refresh-token
router.post('/refresh-token', authController.refreshToken)

module.exports = router