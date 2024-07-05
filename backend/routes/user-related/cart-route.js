const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/user-related/cart-controller')
const { authorizationMiddleware } = require("../../controllers/user-related/authentication-controller")

router.use(authorizationMiddleware)

// GET eatwave/cart
router.get('/', cartController.getCart)

//POST eatwave/cart/update
router.post('/update', cartController.updateCart)
 
module.exports = router