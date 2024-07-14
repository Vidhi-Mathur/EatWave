const { body, param } = require("express-validator")

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

exports.createRestaurantValidation = [
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("ownerName").notEmpty().withMessage("Owner name is required"),
    body('phone').notEmpty().withMessage("Phone number is required").isMobilePhone().withMessage('Invalid phone number'),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
    body("address").notEmpty().withMessage("Address is required"),
    body("openingTime").notEmpty().withMessage("Opening Time is required").isISO8601().toDate().withMessage("Invalid opening time format"),
    body("closingTime").notEmpty().withMessage("Closing Time is required").isISO8601().toDate().withMessage("Invalid closing time format"),
    body("workingDays").isArray().notEmpty().withMessage("Working Days are required"),
    body("packagingCharges").isNumeric().withMessage("Packaging charges has to be numeric value"),
    body("accountNumber").notEmpty().withMessage("Account Number is required").isNumeric().withMessage("Account Number has to be numeric value"),
    body("fssai").notEmpty().withMessage("FSSAI certificate number is required").isNumeric().withMessage("FSSAI certificate number has to be numeric value"),
    body("foodType").isArray().isEmpty().withMessage("Food type must be selected").isIn(['Veg', 'Both']).withMessage("Invalid food type"),
    body("cuisine").isArray().notEmpty().withMessage("Cuisine is required"),
    body("menu").isMongoId().withMessage("Valid MenuId is required"),
    body("imageUrls").isArray().withMessage("Invalid imageUrl format"),
    body("costForTwo").notEmpty().withMessage("Cost For Two is required").isNumeric("Cost for Two has to be numeric value"),
    handleValidationErrors
]

exports.updateRestaurantValidation = [
    param("restaurantId").isMongoId().withMessage("Valid restaurantId is required"),
    body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
    body("ownerName").notEmpty().withMessage("Owner name is required"),
    body('phone').notEmpty().withMessage("Phone number is required").isMobilePhone().withMessage('Invalid phone number'),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
    body("address").notEmpty().withMessage("Address is required"),
    body("openingTime").notEmpty().withMessage("Opening Time is required").isISO8601().toDate().withMessage("Invalid opening time format"),
    body("closingTime").notEmpty().withMessage("Closing Time is required").isISO8601().toDate().withMessage("Invalid closing time format"),
    body("workingDays").isArray().notEmpty().withMessage("Working Days are required"),
    body("packagingCharges").isNumeric().withMessage("Packaging charges has to be numeric value"),
    body("accountNumber").notEmpty().withMessage("Account Number is required").isNumeric().withMessage("Account Number has to be numeric value"),
    body("fssai").notEmpty().withMessage("FSSAI certificate number is required").isNumeric().withMessage("FSSAI certificate number has to be numeric value"),
    body("foodType").isArray().isEmpty().withMessage("Food type must be selected").isIn(['Veg', 'Both']).withMessage("Invalid food type"),
    body("cuisine").isArray().notEmpty().withMessage("Cuisine is required"),
    body("menu").isMongoId().withMessage("Valid MenuId is required"),
    body("imageUrls").isArray().withMessage("Invalid imageUrl format"),
    body("costForTwo").notEmpty().withMessage("Cost For Two is required").isNumeric("Cost for Two has to be numeric value"),
    handleValidationErrors
]

exports.restaurantIdValidation = [
    param("restaurantId").isMongoId().withMessage("Valid restaurantId is required"), 
    handleValidationErrors
]

exports.filterRestaurantsByCuisinesValidation = [
    body("cuisines").isArray().withMessage("Cuisines must be an array"),
    handleValidationErrors
]

exports.filterRestaurantsByRatingsValidation = [
    body("ratings").isArray().withMessage("Ratings must be an array").custom(value => value.every(rating => typeof rating === 'number' && rating >= 0 && rating <= 5)).withMessage("Invalid rating, should be number between 0 & 5"),
    handleValidationErrors
]

exports.filterRestaurantsByPreferenceValidation = [
    body("preference").isIn(['Veg', 'Non-Veg']).withMessage("Invalid preference"),
    handleValidationErrors
]

exports.filterRestaurantsByCostForTwoValidation = [
    body('costForTwo').isArray().withMessage('Cost for two must be an array').custom((value) => value.every(cost => ['Less than 300', 'Between 300-600', 'Greater than 600'].includes(cost))).withMessage('Invalid cost range'),
    handleValidationErrors
]