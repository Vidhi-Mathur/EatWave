const express = require('express')
const router = express.Router()
const reviewController = require('../../controllers/shared/review-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')

//POST /eatwave/reviews/:order
router.post('/:order', authorizationMiddleware, reviewController.postReviews)

router.patch('/:order', authorizationMiddleware, reviewController.editReviews)

//GET /eatwave/review/:order
router.get('/order/:order', reviewController.getReviewByOrderId)

//GET /eatwave/review/restaurant/:restaurant
router.get('/restaurant/:restaurant', reviewController.getReviewsByRestaurantId)

//GET /eatwave/review/user/:user
router.get('/user/:user', reviewController.getReviewsByUserId)

//PATCH /eatwave/review/:review
router.patch('/:review', reviewController.updateReview)

//GET /eatwave/review/average-rating/:restaurant
router.get('/average-rating/:restaurant', reviewController.getAverageRating)

//GET /eatwave/review/top-rated-restaurants
router.get('/top-rated-restaurants', reviewController.getTopRatedRestaurants)

module.exports = router