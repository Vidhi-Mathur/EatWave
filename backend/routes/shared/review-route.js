const express = require('express')
const router = express.Router()
const { getReviewsByRestaurantId, getTopRatedRestaurants, postReviews, getReviewByOrderId, updateReview}= require('../../controllers/shared/review-controller')
const { authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')
const { createReviewValidation, updateReviewValidation, getReviewsByRestaurantIdValidation, getReviewByOrderIdValidation } = require('../../validators/shared/review-validator')

//GET /eatwave/review/restaurant/:restaurantId
router.get('/restaurant/:restaurantId', getReviewsByRestaurantIdValidation, getReviewsByRestaurantId)

//GET /eatwave/review/top-rated-restaurants
router.get('/top-rated-restaurants', getTopRatedRestaurants)

router.use(authorizationMiddleware)

//POST /eatwave/reviews/:orderId
router.post('/:orderId', createReviewValidation, postReviews)

//GET /eatwave/review/order/:orderId
router.get('/order/:orderId', getReviewByOrderIdValidation, getReviewByOrderId)

//PATCH /eatwave/review/:reviewId
router.patch('/:reviewId', updateReviewValidation, updateReview)

module.exports = router