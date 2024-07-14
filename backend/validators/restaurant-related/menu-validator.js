const { body, param, validationResult } = require("express-validator")

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    next()
}

exports.createMenuValidation = [
    body("items").isArray().notEmpty().withMessage("Menu can't be empty"),
    body("items.*.name").notEmpty().withMessage("Item name can't be empty"),
    body("items.*.description").notEmpty().withMessage("Item description can't' be empty"),
    body("items.*.price").notEmpty().withMessage("Item price can't be empty").isNumeric().withMessage("Item price must be a numeric value"),
    body("items.*.foodTags").isArray().isEmpty().withMessage("Food tags must be selected"),
    body("items.*.foodTags.*").isIn(['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Spicy', 'Non-Spicy', 'Mild-Spicy']).withMessage("Invalid FoodTag"), 
    handleValidationErrors
]

exports.getMenuByIdValidation = [
    param("menuId").isMongoId().withMessage("Valid MenuId is required"), 
    handleValidationErrors
]

exports.updateMenuValidation = [
    param("menuId").isMongoId().withMessage("Valid MenuId is required"),
    body("items").isArray().notEmpty().withMessage("Menu can't be empty"),
    body("items.*.name").notEmpty().withMessage("Item name can't be empty"),
    body("items.*.description").notEmpty().withMessage("Item description can't' be empty"),
    body("items.*.price").notEmpty().withMessage("Item price can't be empty").isNumeric().withMessage("Item price must be a numeric value"),
    body("items.*.foodTags").isArray().isEmpty().withMessage("Food tags must be selected"),
    body("items.*.foodTags.*").isIn(['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Spicy', 'Non-Spicy', 'Mild-Spicy']).withMessage("Invalid FoodTag"), 
    handleValidationErrors
]