const express = require('express')
const router = express.Router()
const { getSuggestions, getResults} = require('../../controllers/user-related/search-controller')
const { getQueryValidation } = require("../../validators/user-related/search-validator")

//GET eatwave/search/suggestions?query=${query}
router.get('/suggestions', getQueryValidation, getSuggestions)

//GET eatwave/search/results?query=${query}
router.get('/results', getQueryValidation, getResults)
 
module.exports = router