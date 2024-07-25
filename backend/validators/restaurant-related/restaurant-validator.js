const { body, param } = require("express-validator")
const { handleValidationErrors } = require("../common/handleValidationErrors")

exports.createRestaurantValidation = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("ownerName").notEmpty().withMessage("Owner name is required"),
    body('phone').notEmpty().withMessage("Phone number is required").bail().isMobilePhone().withMessage('Invalid phone number'),
    body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid email"),
    body("address").notEmpty().withMessage("Address is required"),
    body("openingTime").notEmpty().withMessage("Opening Time is required").bail().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Invalid opening time format"),
    body("closingTime").notEmpty().withMessage("Closing Time is required").bail().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Invalid closing time format"),
    body("workingDays").notEmpty().withMessage("Working Days are required").bail().isArray().withMessage("Invalid Working Days format"),
    body("packagingCharges").optional().isNumeric().withMessage("Invalid packaging charges"),
    body("accountNumber").notEmpty().withMessage("Account Number is required").bail().isNumeric().withMessage("Invalid Account Number"),
    body("fssai").notEmpty().withMessage("FSSAI certificate number is required").bail().isNumeric().withMessage("Invalid FSSAI certificate number"),
    body("foodType").notEmpty().withMessage("Food type must be selected").bail().isIn(['Veg', 'Both']).withMessage("Invalid food type"),
    body("cuisine").notEmpty().withMessage("Cuisine is required").bail().isArray().withMessage("Invalid cuisine format"),
    body("menu").notEmpty().withMessage("No Menu saved").bail().isMongoId().withMessage("Invalid MenuId"),
    body("imageUrls").optional().isArray().custom((arr) => arr.every(url => typeof url === 'string')).withMessage("Invalid imageUrl format"),
    body("costForTwo").notEmpty().withMessage("Cost For Two is required").bail().isNumeric("Invalid Cost for Two"),
    handleValidationErrors
]

exports.updateRestaurantValidation = [
    param("restaurantId").isMongoId().withMessage("Valid restaurantId is required"),
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("ownerName").notEmpty().withMessage("Owner name is required"),
    body('phone').notEmpty().withMessage("Phone number is required").bail().isMobilePhone().withMessage('Invalid phone number'),
    body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid email"),
    body("address").notEmpty().withMessage("Address is required"),
    body("openingTime").notEmpty().withMessage("Opening Time is required").bail().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Invalid opening time format"),
    body("closingTime").notEmpty().withMessage("Closing Time is required").bail().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Invalid closing time format"),
    body("workingDays").notEmpty().withMessage("Working Days are required").bail().isArray().withMessage("Invalid Working Days format"),
    body("packagingCharges").optional().isNumeric().withMessage("Invalid packaging charges"),
    body("accountNumber").notEmpty().withMessage("Account Number is required").bail().isNumeric().withMessage("Invalid Account Number"),
    body("fssai").notEmpty().withMessage("FSSAI certificate number is required").bail().isNumeric().withMessage("Invalid FSSAI certificate number"),
    body("foodType").notEmpty().withMessage("Food type must be selected").bail().isIn(['Veg', 'Both']).withMessage("Invalid food type"),
    body("cuisine").notEmpty().withMessage("Cuisine is required").bail().isArray().withMessage("Invalid cuisine format"),
    body("menu").notEmpty().withMessage("No Menu saved").bail().isMongoId().withMessage("Invalid MenuId"),
    body("imageUrls").optional().isArray().custom((arr) => arr.every(url => typeof url === 'string')).withMessage("Invalid imageUrl format"),
    body("costForTwo").notEmpty().withMessage("Cost For Two is required").bail().isNumeric("Invalid Cost for Two"),
    handleValidationErrors
]

exports.restaurantIdValidation = [
    param("restaurantId").isMongoId().withMessage("Valid restaurantId is required"), 
    handleValidationErrors
]

exports.filterRestaurantsValidation = [
    body('sort').optional().isIn(['Relevance (default)', 'Ratings', 'Cost: Low To High', 'Cost: High To Low']).withMessage('Invalid sort type'),
    body("cuisines").optional().isArray().withMessage("Cuisines must be an array").bail().custom(value => value.every(cuisine => typeof cuisine === 'string')).withMessage("Invalid cuisine type"),
    body("ratings").optional().isArray().withMessage("Ratings must be an array").bail().custom(value => value.every(rating => typeof rating === 'number' && rating >= 0 && rating <= 5)).withMessage("Invalid rating, should be number between 0 & 5"),
    body("preference").optional().isIn(['Veg', 'Non-Veg']).withMessage("Invalid preference"),
    body('costForTwo').optional().isArray().withMessage('Cost for two must be an array').bail().custom((value) => value.every(cost => ['Less than 300', 'Between 300-600', 'Greater than 600'].includes(cost))).withMessage('Invalid cost range'),
    handleValidationErrors
]