const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/restaurant-related/restaurant-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')
const { restaurantIdValidation, createRestaurantValidation, updateRestaurantValidation, filterRestaurantsByCuisinesValidation, filterRestaurantsByCostForTwoValidation, filterRestaurantsByPreferenceValidation, filterRestaurantsByRatingsValidation } = require("../../validators/restaurant-related/restaurant-validator")

//GET /eatwave/restaurant/:restaurantId
router.get('/:restaurantId', restaurantIdValidation, restaurantController.getRestaurantById)

//GET /eatwave/restaurant/sort/default
router.get('/sort/default', restaurantController.sortRestaurantsByDefault)

//GET /eatwave/restaurant/sort/ratings
router.get('/sort/ratings', restaurantController.sortRestaurantsByRatings)

//GET /eatwave/restaurant/sort/cost-low-to-high
router.get('/sort/cost-low-to-high', restaurantController.sortRestaurantsByLowToHighCost)

//GET /eatwave/restaurant/sort/cost-high-to-low
router.get('/sort/cost-high-to-low', restaurantController.sortRestaurantsByHighToLowCost)

//POST /eatwave/restaurant/filter/cuisines
router.post('/filter/cuisines', filterRestaurantsByCuisinesValidation, restaurantController.filterRestaurantsByCuisines)

//POST /eatwave/restaurant/filter/ratings
router.post('/filter/ratings', filterRestaurantsByRatingsValidation, restaurantController.filterRestaurantsByRatings)

//POST /eatwave/restaurant/filter/preference
router.post('/filter/preference', filterRestaurantsByPreferenceValidation, restaurantController.filterRestaurantsByPreference)

//POST /eatwave/restaurant/filter/cost-for-two
router.post('/filter/cost-for-two', filterRestaurantsByCostForTwoValidation, restaurantController.filterRestaurantsByCostForTwo)

router.use(authorizationMiddleware)

//POST /eatwave/restaurant/new
router.post('/new', createRestaurantValidation, restaurantController.createRestaurant)

//PATCH /eatwave/restaurant/:restaurantId
router.patch('/:restaurantId', updateRestaurantValidation, restaurantController.updateRestaurant)

//DELETE /eatwave/restaurant/:restaurantId
router.delete('/:restaurantId', restaurantIdValidation, restaurantController.deleteRestaurant)

module.exports = router