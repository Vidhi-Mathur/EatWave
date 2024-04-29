const User = require('../../models/user-related/user-model')
const Restaurant = require('../../models/restaurant-related/restaurant-model')
const Menu = require('../../models/restaurant-related/menu-model')
const Order = require('../../models/shared/order-model')

exports.placeOrder = async(req, res, next) => {
    try {
        const { user, restaurant, items, totalCost, address } = req.body
        //User/ Restaurant/ items not found
        const existingUser = await User.findById(user)
        if(!existingUser) return res.status(404).json({message: 'No user found, try sign up before placing order'})
        const existingResaturant = await Restaurant.findById(restaurant)
        if(!existingResaturant) return res.status(404).json({message: 'No restaurant found'})
        const menu = await Menu.findById(existingResaturant.menu)
        //Check existing of each item into menu. No forEach() as asynchonous
        for(const item of items){
            const existingItem = menu.items.find(currItem => {
                return currItem._id.toString() === item.item
            })
            if(!existingItem) return res.status(404).json({message: 'No such item exist in menu'})
        }
        const order = new Order({
            user, 
            restaurant, 
            items, 
            totalCost, 
            address
        })
        await order.save()
        res.status(200).json({ order })
        //Save placed order for that particular user
        existingUser.pastOrders = order._id
        await existingUser.save()
        //Save placed order for that particular restaurant too
        existingResaturant.pastOrders = order._id
        await existingResaturant.save()
    }
    catch(err) {
        next(err)
    }
}

exports.getOrderById = async(req, res, next) => {
    try {
        const { id } = req.params
        const order = await Order.findById(id)
        if(!order) return res.status(404).json({message: 'Order not found'})
        return res.status(200).json({ order })
    }
    catch(err) {
        next(err)
    }
}

exports.updateOrderStatus = async(req, res, next) => {
    try {
        const { id } = req.params
        const { status } = req.body
        // Validate status)
        const valid = ['Placed', 'Confirmed', 'Preparing', 'On the way', 'Delivered', 'Cancelled'];
        if (!valid.includes(status)) return res.status(400).json({ message: 'Invalid order status' });
        const order = await Order.findById(id)
        if(!order) return res.status(404).json({message: 'Order not found'})
        order.status = status
        await order.save()
        return res.status(200).json()
    }
    catch(err) {
        next(err)
    }
}

exports.getUserOrderHistory = async(req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).json({message: 'No user found, try sign up.'})
        //Only returns id
        const orders = await Order.find({ user: id }).select('_id')
        res.status(200).json({ orders })
    }
    catch(err) {
        next(err)
    }
}

exports.getRestaurantOrderHistory = async(req, res, next) => {
    try {
        const { id } = req.params
        const restaurant = await Restaurant.findById(id)
        if(!restaurant) return res.status(404).json({message: 'No restaurant found, try sign up.'})
        //Only returns id
        const orders = await Order.find({ restaurant: id }).select('_id')
        res.status(200).json({ orders })
    }
    catch(err) {
        next(err)
    }
}

exports.cancelOrder = async(req, res, next) => {
    try {
        const { id } = req.params
        const order = await Order.findById(id)
        if(!order) return res.status(404).json({message: 'Order not found'})
        order.status = 'Cancelled'
        return res.status(200).json({ message: 'Order cancelled successfully' })
    }
    catch(err) {
        next(err)
    }
}
