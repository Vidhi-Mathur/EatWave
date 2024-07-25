const { body, param } = require("express-validator")
const { handleValidationErrors } = require("../common/handleValidationErrors")

exports.createMenuValidation = [
    body("items").notEmpty().withMessage("Menu can't be empty").bail().isArray().withMessage("Invalid Menu format"),
    body("items.*.name").notEmpty().withMessage("Item name can't be empty"),
    body("items.*.description").notEmpty().withMessage("Item description can't be empty"),
    body("items.*.price").notEmpty().withMessage("Item price can't be empty").bail().isNumeric().withMessage("Invalid item price"),
    body("items.*.foodTags").notEmpty().withMessage("Food tags must be selected"),
    body("items.*.foodTags.*").isIn(['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Spicy', 'Non-Spicy', 'Mild-Spicy']).withMessage("Invalid Food Tag"), 
    handleValidationErrors
]

exports.getMenuByIdValidation = [
    param("menuId").isMongoId().withMessage("Valid MenuId is required"), 
    handleValidationErrors
]

exports.updateMenuValidation = [
    param("menuId").isMongoId().withMessage("Valid MenuId is required"),
    body("items").notEmpty().withMessage("Menu can't be empty").bail().isArray().withMessage("Empty Menu can't be saved"),
    body("items.*.name").notEmpty().withMessage("Item name can't be empty"),
    body("items.*.description").notEmpty().withMessage("Item description can't be empty"),
    body("items.*.price").notEmpty().withMessage("Item price can't be empty").bail().isNumeric().withMessage("Invalid item price"),
    body("items.*.foodTags").notEmpty().withMessage("Food tags must be selected"),
    body("items.*.foodTags.*").isIn(['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Spicy', 'Non-Spicy', 'Mild-Spicy']).withMessage("Invalid Food Tag"), 
    handleValidationErrors
]