const Menu = require("../../models/restaurant-related/menu-model")
const Restaurant = require('../../models/restaurant-related/restaurant-model');

const performSearch = async({query, limit = null}) => {
        if (typeof query !== 'string' || query.trim() === '') {
            throw new Error('Invalid query');
        }
        // Fetch restaurants matching the query to access restaurantName, imageUrls and averageRating
        let restaurantQuery = Restaurant.find({ restaurantName: { $regex: query, $options: 'i' }}).select('restaurantName imageUrls averageRating costForTwo cuisine').lean()
        if(limit){
            restaurantQuery = restaurantQuery.limit(limit)
        }
        let restaurants = await restaurantQuery
        let restaurantSuggestions = restaurants.map(restaurant => ({
            _id: restaurant._id,
            restaurantName: restaurant.restaurantName,
            imageUrl: restaurant.imageUrls[0],
            averageRating: restaurant.averageRating,
            costForTwo: restaurant.costForTwo,
            cuisine: restaurant.cuisine
        }));
        // Fetch menu items matching query
        let menuQuery = Menu.find({'items.name': { $regex: query, $options: 'i' }}).select('items.name items._id items.price items.description').populate('restaurant', 'restaurantName averageRating').lean()
        if(limit){
            menuQuery = menuQuery.limit(limit)
        }
        let menuSuggestions = await menuQuery
        //Map items with name and id
        let dishSuggestions = menuSuggestions.flatMap(menu => menu.items
            .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
            .map(item => ({ 
                _id: item._id, 
                name: item.name, 
                price: item.price, 
                description: item.description,
                restaurantId: menu.restaurant._id,
                restaurantName: menu.restaurant.restaurantName, 
                restaurantRating: menu.restaurant.averageRating
        })))
        return {
            restaurants: restaurantSuggestions,
            dishes: limit? dishSuggestions.slice(0, limit): dishSuggestions
        }
}

exports.getSuggestions = async(req, res, next) => {
    const { query } = req.query
    try {
        const suggestions = await performSearch({query, limit: 5})
        res.status(200).json(suggestions);
    }
    catch(err){
        next(err)
    }
}

exports.getResults = async(req, res, next) => {
    const { query } = req.query
    try {
        const searchResults = await performSearch({query})
        res.status(200).json(searchResults);
    } 
    catch (err) {
        next(err)
    }
}