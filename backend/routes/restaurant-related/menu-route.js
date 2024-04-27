const express = require('express')
const router = express.Router()
const menuController = require('../../controllers/restaurant-related/menu-controller')

//GET /eatwave/restaurant/menu/:id
router.get('/:id', menuController.getMenuById)

//POST /eatwave/restaurant/menu/new
router.post('/new', menuController.createMenu)

//PATCH /eatwave/restaurant/menu/:menuId/items/:itemId
router.patch('/:menuId', menuController.updateMenu)

module.exports = router