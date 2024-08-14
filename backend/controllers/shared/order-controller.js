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
        //Handle status updates
        handleOrderStatusUpdates(order, req.io);
    } 
    catch (err) {
        next(err);
    }
};

exports.getOrderByOrderId = async(req, res, next) => {
    try {
        const { orderId } = req.params
        const order = await Order.findById(orderId)
        if(!order) return res.status(404).json({message: 'Order not found'})
        res.status(200).json({ order })
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
        const { restaurantId } = req.params
        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant) return res.status(404).json({message: 'No restaurant found, try sign up.'})
        //Only returns id
        const orders = await Order.find({ restaurant: restaurantId }).select('_id')
        console.log(orders)
        res.status(200).json({ orders })
    }
    catch(err) {
        next(err)
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handleOrderStatusUpdates = async (order, io) => {
    try {
        const statuses = ['Confirmed', 'Preparing', 'On the way', 'Delivered'];
        for (let status of statuses) {
            //Delay up to [1, 2] min
            const randomTime = Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000;
            await delay(randomTime);
            order.status = status;
            await order.save();
            io.emit('orderStatusUpdate', { orderId: order._id, status });
        }
    } 
    catch(err) {
        next(err)
    }
}