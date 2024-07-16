const { body } = require("express-validator")
const { handleValidationErrors } = require("../common/handleValidationErrors")

exports.updateCartValidation = [
    body('updates').notEmpty().withMessage("Updates can't be empty").bail().isArray().withMessage("Updates must be and array"),
    body("updates.*.type").isIn(['add', 'remove', 'clear']).withMessage("Invalid update type"),
    body("updates.*.itemId").isMongoId().withMessage("Invalid ItemId"),
    body('restaurant').isMongoId().withMessage("Invalid RestaurantId"),
    handleValidationErrors
]