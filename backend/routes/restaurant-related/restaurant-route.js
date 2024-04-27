const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/restaurant-related/restaurant-controller')

//GET /eatwave/restaurant/:id
router.get('/:id', restaurantController.getRestaurantById)

//POST /eatwave/restaurant/new
router.post('/new', restaurantController.createRestaurant)

//PATCH /eatwave/restaurant/:id
router.patch('/:id', restaurantController.updateRestaurant)

//DELETE /eatwave/restaurant/:id
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router