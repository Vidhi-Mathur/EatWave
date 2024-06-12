const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require("fs")
const restaurantController = require('../../controllers/restaurant-related/restaurant-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')

//GET /eatwave/restaurant/:id
router.get('/:id', restaurantController.getRestaurantById)

router.use(authorizationMiddleware)

//POST /eatwave/restaurant/new
router.post('/new', restaurantController.createRestaurant)

//PATCH /eatwave/restaurant/:id
router.patch('/:id', restaurantController.updateRestaurant)

//DELETE  /eatwave/restaurant/:id
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router