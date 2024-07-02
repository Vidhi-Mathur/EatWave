const express = require('express')
const router = express.Router()
const menuController = require('../../controllers/restaurant-related/menu-controller')
const {authorizationMiddleware } = require('../../controllers/user-related/authentication-controller')

//GET /eatwave/restaurant/menu/:id
router.get('/:id', menuController.getMenuById)

router.use(authorizationMiddleware)

//POST /eatwave/restaurant/menu/new
router.post('/new', menuController.createMenu)

//PATCH  /eatwave/restaurant/menu/:menuId
router.patch('/:menuId', menuController.updateMenu)

module.exports = router