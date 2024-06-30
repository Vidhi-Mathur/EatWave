const express = require('express')
const router = express.Router()
const reviewController = require('../../controllers/shared/review-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')

//POST /eatwave/reviews/:order
router.post('/:order', authorizationMiddleware, reviewController.postReviews)

//GET /eatwave/review/order/:order
router.get('/order/:order', reviewController.getReviewByOrderId)

//GET /eatwave/review/restaurant/:restaurant
router.get('/restaurant/:restaurant', reviewController.getReviewsByRestaurantId)

//GET /eatwave/review/user/:user
router.get('/user/:user', reviewController.getReviewsByUserId)

//PATCH /eatwave/review/:review
router.patch('/:review', authorizationMiddleware, reviewController.updateReview)

//GET /eatwave/review/top-rated-restaurants
router.get('/top-rated-restaurants', reviewController.getTopRatedRestaurants)

module.exports = router