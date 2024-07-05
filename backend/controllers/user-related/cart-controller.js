const Cart = require("../../models/user-related/Cart-model");
const Menu = require("../../models/restaurant-related/menu-model")
const Restaurant = require('../..//models/restaurant-related/restaurant-model');


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
        if (!menu) {
            return res.status(200).json({ items: [], restaurant: null });
        }
        //Map cartItemId with those on menu to access name, price and quantity
        const items = cart.items.map(cartItem => {
            const menuItem = menu.items.find(item => item._id.equals(cartItem.item));
            return {
                id: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity: cartItem.quantity
            };
        });
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
        updates.forEach(update => {
            const { type, itemId } = update;
            const itemIdx = cart.items.findIndex(cartItem => cartItem.item.toString() === itemId);
            if (type === 'add') {
                if (itemIdx !== -1) {
                    cart.items[itemIdx].quantity += 1;
                } 
                else {
                    cart.items.push({ item: itemId, quantity: 1 });
                }
            } 
            else if (type === 'remove') {
                if (itemIdx !== -1) {
                    if (cart.items[itemIdx].quantity > 1) {
                        cart.items[itemIdx].quantity -= 1;
                    } 
                    else {
                        cart.items.splice(itemIdx, 1);
                    }
                }
            }
        });
        await cart.save();
        res.status(200).json({ cart });
    } catch (err) {
        next(err);
    }
};
