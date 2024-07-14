const express = require('express')
const router = express.Router()
const menuController = require('../../controllers/restaurant-related/menu-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')
const { createMenuValidation, getMenuByIdValidation, updateMenuValidation } = require('../../validators/restaurant-related/menu-validator')

//GET /eatwave/restaurant/menu/:menuId
router.get('/:menuId',getMenuByIdValidation, menuController.getMenuById)

router.use(authorizationMiddleware)

//POST /eatwave/restaurant/menu/new
router.post('/new', createMenuValidation, menuController.createMenu)

//PATCH  /eatwave/restaurant/menu/:menuId
router.patch('/:menuId', updateMenuValidation, menuController.updateMenu)

module.exports = router