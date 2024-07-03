const Review = require("../../models/shared/review-model")
const Menu = require('../../models/restaurant-related/menu-model')
const Restaurant = require('../../models/restaurant-related/restaurant-model')

exports.createRestaurant = async(req, res, next) => {
    try {
        const { restaurantName, ownerName, phone, email, address, openingTime, closingTime, workingDays, menu, packagingCharges, accountNumber, fssai, foodType, cuisine, imageUrls, costForTwo } = req.body
        const menuCard = await Menu.findById(menu)
        if(!menuCard) return res.status(404).json({message: 'No associated menu found'})
        const newRestaurant = await Restaurant.create({
            restaurantName,
            ownerName,
            phone, 
            email, 
            address, 
            openingTime, 
            closingTime,
            workingDays, 
            menu: menuCard._id, 
            review: null,
            packagingCharges, 
            accountNumber, 
            fssai, 
            foodType,
            cuisine,
            imageUrls,
            costFortwo
        })
        await newRestaurant.save()
        //Associated id of restaurant to menu
        menuCard.restaurant = newRestaurant._id
        await menuCard.save()
        res.status(200).json({ newRestaurant })
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

exports.getRestaurantById = async(req, res, next) => {
    try {
        const { id } = req.params
        const restaurant = await Restaurant.findById(id)
        if(!restaurant) return res.status(404).json({message: 'No associated restaurant found'})
        res.status(200).json({ restaurant })
    }
    catch(err) {
        next(err)
    }
}

exports.sortRestaurantsByDefault = async (req, res, next) => {
    try {
        //Fetch all restaurants
        const restaurants = await Restaurant.find({})
        res.status(200).json({ restaurants })
    }
    catch(err) {
        next(err)
    }
};

exports.sortRestaurantsByRatings = async(req, res, next) => {
    try {
        const restaurants = await Restaurant.find({}).sort({averageRating: -1})
        res.status(200).json({ restaurants })
    }
    catch(err) {
        next(err)
    }
}

exports.sortRestaurantsByLowToHighCost = async(req, res, next) => {
    try {
        const restaurants = await Restaurant.find({}).sort({costForTwo: 1})
        res.status(200).json({ restaurants })
    }
    catch(err) {
        next(err)
    }
}

exports.sortRestaurantsByHighToLowCost = async(req, res, next) => {
    try {
        const restaurants = await Restaurant.find({}).sort({costForTwo: -1})
        res.status(200).json({ restaurants })
    }
    catch(err) {
        next(err)
    }
}

exports.filterRestaurantsByCuisines = async(req, res, next) => {
    try {
        const { cuisines } = req.body
        const restaurants = await Restaurant.find({ cuisine: { $in: cuisines } });
        res.status(200).json({ restaurants })
    }
    catch(err){
        next(err)
    }
}

exports.filterRestaurantsByPreference = async(req, res, next) => {
    try {
        const { preference } = req.body
        let restaurants
        if(preference === "Veg"){
            restaurants = await Restaurant.find({ foodType: "Veg"})
        }
        else {
            restaurants = await Restaurant.find({ foodType: "Both"})
        }
        res.status(200).json({ restaurants })
    }
    catch(err) {
        next(err)
    }
}

exports.filterRestaurantsByRatings = async(req, res, next) => {
    try {
        const { ratings } = req.body
        let range = []
        for(let rating in ratings){
            range.push({ averageRating: { $gte: rating }})
        }
        const query = range.length ? { $or: range } : {};
        const restaurants = await Restaurant.find(query)
        res.status(200).json({ restaurants })
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

exports.filterRestaurantsByCostForTwo = async(req, res, next) => {
    try {
        const { costForTwo } = req.body
        let range = []
        if(costForTwo.includes("Less than 300")){
            range.push({ costForTwo: { $lt: 300 }})
        }
        if(costForTwo.includes("Between 300-600")){
            range.push({ costForTwo: { $gte: 300, $lte: 600 }})
        }
        if(costForTwo.includes("Greater than 600")){
            range.push({ costForTwo: { $gt: 600 }})
        }
        const query = range.length ? { $or: range } : {};
        const restaurants = await Restaurant.find(query)
        res.status(200).json({ restaurants })
    }
    catch(err){
        console.log(err)
        next(err)
    }
}

exports.updateRestaurant = async(req, res, next) => {
    try {
        const { id } = req.params
        const restaurant = await Restaurant.findById(id)
        if(!restaurant) return res.status(404).json({message: 'No associated restaurant found'})    
        const updatedFields = req.body
        if(updatedFields.menu){
            //Delete old menu
            await Menu.findByIdAndDelete(restaurant.menu)
            //Save new one
            restaurant.menu = updatedFields.menu
            //Update restaurant in menu
            const menu = await Menu.findById(updatedFields.menu)
            menu.restaurant = restaurant._id
            await menu.save()
            delete updatedFields.menu
        }
        Object.assign(restaurant, updatedFields)
        await restaurant.save()
        res.status(200).json({ restaurant })
    }
    catch(err) {
        next(err)
    }
}

exports.deleteRestaurant = async(req, res, next) => {
    try {
        const { id } = req.params
        const restaurant = await Restaurant.findById(id)
        if(!restaurant) return res.status(404).json({message: 'No associated restaurant found'})
        await Restaurant.findByIdAndDelete(id)
        //Delete associated menu with that restaurant
        await Menu.deleteMany({ restaurant: restaurant._id })
        //Delete reviews associated with that restaurant
        await Review.deleteMany({ restaurant: restaurant._id})
        res.status(200).json({message: 'Deleted successfully'})
    }
    catch(err){
        next(err)
    }
}