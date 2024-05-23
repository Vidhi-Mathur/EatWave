require('dotenv').config()
const crypto = require('crypto')
const RazorPay = require('razorpay')
const User = require('../../models/user-related/user-model');
const Restaurant = require('../../models/restaurant-related/restaurant-model');
const Menu = require('../../models/restaurant-related/menu-model');
const Order = require('../../models/shared/order-model');

const razorpayInstance = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.initiatePayment = async (req, res, next) => {
    try {
        const { restaurant, items, totalAmount } = await req.body;
        const user = await req.user._id;
        const existingUser = await User.findById(user);
        if (!existingUser) return res.status(404).json({ message: 'No user found, try sign up before placing order' });
        const existingRestaurant = await Restaurant.findById(restaurant);
        if (!existingRestaurant) return res.status(404).json({ message: 'No restaurant found' });
        const menu = await Menu.findById(existingRestaurant.menu);
        for (const item of items) {
            const existingItem = menu.items.find(currItem => currItem._id.toString() === item.item);
            if (!existingItem) return res.status(404).json({ message: 'No such item exist in menu' });
        }
        const order = await razorpayInstance.orders.create({
            amount: totalAmount*100,
            currency: 'INR'
        })
        res.status(200).json({ order: order.id, key: process.env.RAZORPAY_KEY_ID})
    } 
    catch (err) {
        next(err);
    }
};

exports.placeOrder = async (req, res, next) => {
    try {
        const { restaurant, items, totalCost, address, payment_id, order_id, signature } = await req.body;
        const user = await req.user._id;
        const existingUser = await User.findById(user);
        const existingRestaurant = await Restaurant.findById(restaurant);
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${order_id}|${payment_id}`).digest('hex');
        if (generatedSignature !== signature) {
        return res.status(400).json({ message: 'Invalid signature, payment verification failed' });
        }
        const order = new Order({
            user,
            restaurant,
            items,
            totalCost,
            address
        });
        await order.save();
        // Save placed order for that particular user
        existingUser.pastOrders.push(order._id);
        await existingUser.save();
        // Save placed order for that particular restaurant too
        existingRestaurant.pastOrders.push(order._id);
        await existingRestaurant.save();
        res.status(200).json({ order });
    } 
    catch (err) {
        next(err);
    }
};

exports.getOrderByOrderId = async(req, res, next) => {
    try {
        const { id } = req.params
        const order = await Order.findById(id)
        if(!order) return res.status(404).json({message: 'Order not found'})
        res.status(200).json({ order })
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
        const userId = req.user._id;
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message: 'No user found, try sign up.'})
        const orders = await Order.find({ user: userId }).populate('restaurant')
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
        console.log(orders)
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
