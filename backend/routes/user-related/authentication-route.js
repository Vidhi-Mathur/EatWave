const express = require('express')
const router = express.Router()
const { postLogin, postSignup, postLogout, postRefreshToken } = require('../../controllers/user-related/authentication-controller')
const { loginValidation, signupValidation, refreshTokenValidation } = require("../../validators/user-related/authentication-validator")

//POST /eatwave/signup
router.post('/signup', signupValidation, postSignup)

//POST /eatwave/login
router.post('/login', loginValidation, postLogin)

//POST /eatwave/logout
router.post('/logout', postLogout)

//POST /eatwave/refresh-token
router.post('/refresh-token', refreshTokenValidation, postRefreshToken)

module.exports = router