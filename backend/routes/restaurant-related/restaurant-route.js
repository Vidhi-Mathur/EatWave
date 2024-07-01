const express = require('express')
const router = express.Router()
const restaurantController = require('../../controllers/restaurant-related/restaurant-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')

//GET /eatwave/restaurant/:id
router.get('/:id', restaurantController.getRestaurantById)

//GET /eatwave/restaurant/sort/default
router.get('/sort/default', restaurantController.sortRestaurantsByDefault)

//GET /eatwave/restaurant/sort/ratings
router.get('/sort/ratings', restaurantController.sortRestaurantsByRatings)

//GET /eatwave/restaurant/sort/cost-low-to-high
// router.get('/sort/cost-low-to-high', restaurantController.sortRestaurantsByLowToHighCost)

//GET /eatwave/restaurant/sort/cost-high-to-low
// router.get('/sort/cost-high-to-low', restaurantController.sortRestaurantsByHighToLowCost)

//GET /eatwave/restaurant/filter/cuisines
router.post('/filter/cuisines', restaurantController.filterRestaurantsByCuisines)

router.use(authorizationMiddleware)

//POST /eatwave/restaurant/new
router.post('/new', restaurantController.createRestaurant)

//PATCH /eatwave/restaurant/:id
router.patch('/:id', restaurantController.updateRestaurant)

//DELETE /eatwave/restaurant/:id
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router