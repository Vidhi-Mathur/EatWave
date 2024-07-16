const express = require('express')
const router = express.Router()
const { getMenuById, createMenu, updateMenu} = require('../../controllers/restaurant-related/menu-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')
const { createMenuValidation, getMenuByIdValidation, updateMenuValidation } = require('../../validators/restaurant-related/menu-validator')

//GET /eatwave/restaurant/menu/:menuId
router.get('/:menuId',getMenuByIdValidation, getMenuById)

router.use(authorizationMiddleware)

//POST /eatwave/restaurant/menu/new
router.post('/new', createMenuValidation, createMenu)

//PATCH  /eatwave/restaurant/menu/:menuId
router.patch('/:menuId', updateMenuValidation, updateMenu)

module.exports = router