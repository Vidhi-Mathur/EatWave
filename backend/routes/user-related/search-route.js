const express = require('express')
const router = express.Router()
const searchController = require('../../controllers/user-related/search-contoller')

//GET eatwave/search/suggestions?query=${query}
router.get('/suggestions', searchController.getSuggestions)

//GET eatwave/search/results?query=${query}
router.get('/results', searchController.getResults)
 
module.exports = router