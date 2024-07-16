const { body } = require("express-validator")
const { handleValidationErrors } = require("../common/handleValidationErrors")

exports.signupValidation = [
    body("name").trim().notEmpty().withMessage("Name is required").bail().isString().withMessage("Name must be a string"),
    body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid Email").normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').bail().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
]
exports.loginValidation = [
    body("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Invalid Email").normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors
]

exports.refreshTokenValidation = [
    body('refreshToken').notEmpty().withMessage('Refresh token is required').isJWT().withMessage('Invalid refresh token format'),
    handleValidationErrors
]