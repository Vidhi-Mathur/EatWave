require('dotenv').config()
const User = require('../../models/user-related/user-model');
const Restaurant = require('../../models/restaurant-related/restaurant-model');
const Menu = require('../../models/restaurant-related/menu-model');
const Order = require('../../models/shared/order-model');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.placeOrder = async (req, res, next) => {
    try {
        const { restaurant, items, totalCost, address } = await req.body;
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
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => {
              return {
                price_data: {
                  currency: 'INR',
                  product_data: {
                    name: item.name
                  },
                  unit_amount: item.price * 100,
                },
                quantity: item.quantity,
              };
            }),
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel'
          })
        const order = new Order({
            user,
            restaurant,
            items,
            totalCost,
            address,
            session: session.id
        });
        await order.save();
        res.status(200).json({ order });
        // Save placed order for that particular user
        existingUser.pastOrders = order._id;
        await existingUser.save();
        // Save placed order for that particular restaurant too
        existingRestaurant.pastOrders = order._id;
        await existingRestaurant.save();
    } catch (err) {
        console.error("Error placing order:", err); 
        next(err);
    }
};

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
