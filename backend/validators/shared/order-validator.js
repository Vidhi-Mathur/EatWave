const { body, param } = require("express-validator")
const { handleValidationErrors } = require("../common/handleValidationErrors")

exports.initiatePaymentValidation = [
    body("restaurant").notEmpty().withMessage("RestaurantId is required").bail().isMongoId().withMessage("Invalid RestaurantId"),
    body("items").notEmpty().withMessage("Items can't be empty").bail().isArray().withMessage("Items must be an array"),
    body("items.*.item").notEmpty().withMessage("ItemId is missing").bail().isMongoId().withMessage("Invalid RestaurantId"),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('totalAmount').isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),
    handleValidationErrors
]

exports.placeOrderValidation = [
    body("restaurant").notEmpty().withMessage("RestaurantId is required").bail().isMongoId().withMessage("Invalid RestaurantId"),
    body("items").notEmpty().withMessage("Items can't be empty").bail().isArray().withMessage("Items must be an array"),
    body("items.*.item").notEmpty().withMessage("ItemId is missing").bail().isMongoId().withMessage("Invalid RestaurantId"),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('totalCost').isFloat({ min: 0 }).withMessage('Total amount must be a positive number'),
    body("address").isObject().withMessage("Address must be and object"),
    body("address.street").notEmpty().withMessage("Street is required").bail().isString().withMessage("Invalid Street Format"),
    body("address.city").notEmpty().withMessage("City is required").bail().isString().withMessage("Invalid City Format"),
    body("address.state").notEmpty().withMessage("State is required").bail().isString().withMessage("Invalid state Format"),
    body("address.postalCode").notEmpty().withMessage("Postal Code is required").bail().isString().withMessage("Invalid Postal Code format"),
    body('payment_id').notEmpty().withMessage('PaymentId is required'),
    body('order_id').notEmpty().withMessage('OrderId is required'),
    body('signature').notEmpty().withMessage('Signature is required'),
    handleValidationErrors
]

exports.getOrderByOrderIdValidation = [
    param('orderId').notEmpty().withMessage("OrderId is required").bail().isMongoId().withMessage('Invalid orderID'),
    handleValidationErrors
]

exports.getRestaurantOrderHistoryValidation = [
    param('restaurantId').notEmpty().withMessage("RestaurantId is required").bail().isMongoId().withMessage('Invalid restaurantId'),
    handleValidationErrors
]

