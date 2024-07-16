const express = require('express')
const router = express.Router()
const { getCart, updateCart} = require('../../controllers/user-related/cart-controller')
const { updateCartValidation } = require('../../validators/user-related/cart-validator')
const { authorizationMiddleware } = require("../../controllers/user-related/authentication-controller")

router.use(authorizationMiddleware)

// GET eatwave/cart
router.get('/', getCart)

//POST eatwave/cart/update
router.post('/update', updateCartValidation, updateCart)
 
module.exports = router