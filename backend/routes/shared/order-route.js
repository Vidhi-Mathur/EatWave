const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/shared/order-controller')

//POST /eatwave/order/place
router.post('/place', orderController.placeOrder)

//GET /eatwave/order/:id
router.get('/:id', orderController.getOrderById)

//PATCH /eatwave/order/status/:id
router.patch('/status/:id', orderController.updateOrderStatus)

//GET /eatwave/order/user_history/:id
router.get('/user_history/:id', orderController.getUserOrderHistory)

//GET /eavtwave/order/restaurant_history/:id
router.get('/restaurant_history/:id', orderController.getRestaurantOrderHistory)

//DELETE /eatwave/cancel/:id
router.delete('/cancel/:id', orderController.cancelOrder)

module.exports = router