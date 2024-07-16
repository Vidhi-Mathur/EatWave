const express = require('express')
const router = express.Router()
const { getRestaurantById, sortRestaurantsByDefault, sortRestaurantsByRatings, sortRestaurantsByLowToHighCost, sortRestaurantsByHighToLowCost, filterRestaurantsByCuisines, filterRestaurantsByRatings, filterRestaurantsByPreference, filterRestaurantsByCostForTwo, createRestaurant, updateRestaurant, deleteRestaurant } = require('../../controllers/restaurant-related/restaurant-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')
const { restaurantIdValidation, createRestaurantValidation, updateRestaurantValidation, filterRestaurantsByCuisinesValidation, filterRestaurantsByCostForTwoValidation, filterRestaurantsByPreferenceValidation, filterRestaurantsByRatingsValidation } = require("../../validators/restaurant-related/restaurant-validator")

//GET /eatwave/restaurant/:restaurantId
router.get('/:restaurantId', restaurantIdValidation, getRestaurantById)

//GET /eatwave/restaurant/sort/default
router.get('/sort/default', sortRestaurantsByDefault)

//GET /eatwave/restaurant/sort/ratings
router.get('/sort/ratings', sortRestaurantsByRatings)

//GET /eatwave/restaurant/sort/cost-low-to-high
router.get('/sort/cost-low-to-high', sortRestaurantsByLowToHighCost)

//GET /eatwave/restaurant/sort/cost-high-to-low
router.get('/sort/cost-high-to-low', sortRestaurantsByHighToLowCost)

//POST /eatwave/restaurant/filter/cuisines
router.post('/filter/cuisines', filterRestaurantsByCuisinesValidation, filterRestaurantsByCuisines)

//POST /eatwave/restaurant/filter/ratings
router.post('/filter/ratings', filterRestaurantsByRatingsValidation, filterRestaurantsByRatings)

//POST /eatwave/restaurant/filter/preference
router.post('/filter/preference', filterRestaurantsByPreferenceValidation, filterRestaurantsByPreference)

//POST /eatwave/restaurant/filter/cost-for-two
router.post('/filter/cost-for-two', filterRestaurantsByCostForTwoValidation, filterRestaurantsByCostForTwo)

router.use(authorizationMiddleware)

//POST /eatwave/restaurant/new
router.post('/new', createRestaurantValidation, createRestaurant)

//PATCH /eatwave/restaurant/:restaurantId
router.patch('/:restaurantId', updateRestaurantValidation, updateRestaurant)

//DELETE /eatwave/restaurant/:restaurantId
router.delete('/:restaurantId', restaurantIdValidation, deleteRestaurant)

module.exports = router