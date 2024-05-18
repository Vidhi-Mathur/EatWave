const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/shared/order-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')

router.use(authorizationMiddleware)

//POST /eatwave/order/payment
router.post('/payment', orderController.initiatePayment)

//POST /eatwave/order/place
router.post('/place', orderController.placeOrder)

//GET /eatwave/order/user_history
router.get('/user_history', orderController.getUserOrderHistory)

//GET /eatwave/order/:id
router.get('/:id', orderController.getOrderByOrderId)

//PATCH /eatwave/order/status/:id
router.patch('/status/:id', orderController.updateOrderStatus)

//GET /eavwave/order/restaurant_history/:id
router.get('/restaurant_history/:id', orderController.getRestaurantOrderHistory)

//DELETE /eatwave/cancel/:id
router.delete('/cancel/:id', orderController.cancelOrder)

module.exports = router