const { query } = require("express-validator")
const { handleValidationErrors } = require("../common/handleValidationErrors")

exports.getQueryValidation = [
    query('query').trim().isLength({min: 1}).withMessage("Searched query can't be empty").bail().isString().withMessage("Searched query must be string"),
    handleValidationErrors
]
