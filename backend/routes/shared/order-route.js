const express = require('express')
const router = express.Router()

//POST /eatwave/order/place
router.post('/place')

//GET /eatwave/order/:id
router.get('/:id')

//PATCH /eatwave/order/status/:id
router.patch('/status/:id')

//GET /eatwave/order/history/:id
router.get('/history/:id')

//DELETE /eatwave/cancel/:id
router.delete('/cancel/:id')

module.exports = router