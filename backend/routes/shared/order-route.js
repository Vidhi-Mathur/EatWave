const express = require('express')
const router = express.Router()
const { initiatePayment, placeOrder, getUserOrderHistory, getOrderByOrderId, updateOrderStatus, getRestaurantOrderHistory, cancelOrder} = require('../../controllers/shared/order-controller')
const { initiatePaymentValidation, placeOrderValidation, getOrderByOrderIdValidation, getRestaurantOrderHistoryValidation} = require("../../validators/shared/order-validator")
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')

router.use(authorizationMiddleware)

//POST /eatwave/order/checkout
router.post('/checkout', initiatePaymentValidation, initiatePayment)

//POST /eatwave/order/place
router.post('/place', placeOrderValidation, placeOrder)

//GET /eatwave/order/user_history
router.get('/user_history', getUserOrderHistory)

//GET /eatwave/order/:orderId
router.get('/:orderId', getOrderByOrderIdValidation, getOrderByOrderId)

//PATCH /eatwave/order/status/:orderId
router.patch('/status/:orderId', updateOrderStatus)

//GET /eavwave/order/restaurant_history/:restaurantId
router.get('/restaurant_history/:restaurantId', getRestaurantOrderHistoryValidation, getRestaurantOrderHistory)

//DELETE /eatwave/cancel/:id
router.delete('/cancel/:orderId', cancelOrder)

module.exports = router