const express = require('express')
const router = express.Router()
const { getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, filterRestaurants } = require('../../controllers/restaurant-related/restaurant-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')
const { restaurantIdValidation, createRestaurantValidation, updateRestaurantValidation,  filterRestaurantsValidation} = require("../../validators/restaurant-related/restaurant-validator")

//GET /eatwave/restaurant/:restaurantId
router.get('/:restaurantId', restaurantIdValidation, getRestaurantById)

//POST /eatwave/restaurant/filter
router.post('/filter', filterRestaurantsValidation, filterRestaurants);

router.use(authorizationMiddleware)

//POST /eatwave/restaurant/new
router.post('/new', createRestaurantValidation, createRestaurant)

//PATCH /eatwave/restaurant/:restaurantId
router.patch('/:restaurantId', updateRestaurantValidation, updateRestaurant)

//DELETE /eatwave/restaurant/:restaurantId
router.delete('/:restaurantId', restaurantIdValidation, deleteRestaurant)

module.exports = router