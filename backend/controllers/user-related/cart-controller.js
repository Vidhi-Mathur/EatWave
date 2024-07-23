const Cart = require("../../models/user-related/Cart-model");
const Menu = require("../../models/restaurant-related/menu-model")
const Restaurant = require('../../models/restaurant-related/restaurant-model');

exports.getCart = async (req, res, next) => {
    try {
        const user = req.user._id;
        const cart = await Cart.findOne({ user });
        if (!cart) {
            return res.status(200).json({ items: [], restaurant: null });
        }
        //Access restaurant's name and menuId
        const restaurant = await Restaurant.findById(cart.restaurant).select('menu restaurantName');
        if (!restaurant) {
            return res.status(200).json({ items: [], restaurant: null });
        }
        //Access items through menuId
        const menu = await Menu.findById(restaurant.menu).select('items');
        if (!menu || !menu.items || menu.items.length === 0) {
            return res.status(200).json({ items: [], restaurant: null });
        }
        const items = cart.items.map(cartItem => {
            const menuItem = menu.items.find(item => item._id && item._id.equals(cartItem.item));
            if (!menuItem) {
                return null;
            }
            return {
                id: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: cartItem.quantity
            };
            //Remove any null items
        }).filter(Boolean); 
        res.status(200).json({
            items,
            restaurant: {
                _id: cart.restaurant,
                name: restaurant.restaurantName
            }
        });
    } 
    catch (err) {
        next(err);
    }
};

exports.updateCart = async (req, res, next) => {
    try {
        const { updates, restaurant } = req.body;
        const user = req.user._id;
        let cart = await Cart.findOne({ user });
        if (!cart) {
            cart = new Cart({ user, restaurant, items: [] });
        } 
        else if (restaurant && restaurant !== cart.restaurant.toString()) {
            cart.items = []; 
            cart.restaurant = restaurant;
        }
        updates.forEach(update => {
            const { type, itemId, name, price } = update;
            if (type === 'clear') {
                cart.items = [];
                cart.restaurant = restaurant;
            } 
            else {
                const itemIdx = cart.items.findIndex(cartItem => cartItem.item.toString() === itemId);
                if (type === 'add') {
                    if (itemIdx !== -1) {
                        cart.items[itemIdx].quantity += 1;
                    } 
                    else {
                        cart.items.push({ item: itemId, quantity: 1, name, price });
                    }
                }
                 else if (type === 'remove') {
                    if (itemIdx !== -1) {
                        if (cart.items[itemIdx].quantity > 1) {
                            cart.items[itemIdx].quantity -= 1;
                        } else {
                            cart.items.splice(itemIdx, 1);
                        }
                    }
                }
            }
        });
        await cart.save();
        res.status(200).json({ cart });
    } 
    catch (err) {
        next(err);
    }
};
