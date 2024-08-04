const { body, param } = require("express-validator")
const { handleValidationErrors } = require("../common/handleValidationErrors")

exports.createReviewValidation = [
    param("orderId").isMongoId().withMessage("Valid OrderId is required"), 
    body("restaurant").isMongoId().withMessage("Valid RestaurantId is required"),
    body("reviewer").isMongoId().withMessage("Valid ReviewerId is required"),
    body("rating").isInt({ min: 0, max: 5 }).withMessage("Invalid rating, should be a number between 0 & 5"),
    body("comments").optional().isString(),
    body("imageUrl").optional().isURL(), 
    handleValidationErrors
]

exports.updateReviewValidation = [
    param("reviewId").isMongoId().withMessage("Valid ReviewId is required"), 
    body("restaurant").isMongoId().withMessage("Valid RestaurantId is required"),
    body("rating").isInt({ min: 0, max: 5 }).withMessage("Invalid rating, should be a number between 0 & 5"),
    body("comments").optional().isString(),
    body("imageUrl").optional().isURL(),
    handleValidationErrors
]

exports.getReviewByOrderIdValidation = [
    param("orderId").isMongoId().withMessage("Valid OrderId is required"),
    handleValidationErrors
]

exports.getReviewsByRestaurantIdValidation = [
    param("restaurantId").isMongoId().withMessage("Valid restaurantId is required"),
    handleValidationErrors
]