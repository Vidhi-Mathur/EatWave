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
            costForTwo
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
        const { restaurantId } = req.params
        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant) return res.status(404).json({message: 'No associated restaurant found'})
        res.status(200).json({ restaurant })
    }
    catch(err) {
        next(err)
    }
}

exports.filterRestaurants = async (req, res, next) => {
    try {
        const { sort, cuisines, preference, ratings, costForTwo } = req.body;
        console.log({ sort, cuisines, preference, ratings, costForTwo })
        let query = {};
        if(cuisines && cuisines.length > 0){
            query.cuisine = { $in: cuisines };
        }
        if(preference){
            if(preference === "Veg"){
                query.foodType = "Veg";
            } 
            else{
                query.foodType = query.foodType = "Both";
            } 
        }
        if(ratings && ratings.length > 0){
            query.averageRating = { $gte: Math.min(...ratings) };
        }
        if(costForTwo && costForTwo.length > 0){
            let costQueries = [];
            if(costForTwo.includes("Less than 300")){
                costQueries.push({ costForTwo: { $lt: 300 } });
            }
            if(costForTwo.includes("Between 300-600")){
                costQueries.push({ costForTwo: { $gte: 300, $lte: 600 } });
            }
            if(costForTwo.includes("Greater than 600")){
                costQueries.push({ costForTwo: { $gt: 600 } });
            }
            if(costQueries.length > 0){
                query.$or = costQueries;
            }
        }
        let sortQuery = {};
        if(sort){
            switch (sort) {
                case "Ratings":
                    sortQuery.averageRating = -1;
                    break;
                case "Cost: Low To High":
                    sortQuery.costForTwo = 1;
                    break;
                case "Cost: High To Low":
                    sortQuery.costForTwo = -1;
                    break;
                default: 
                    break;
            }
        }
        const restaurants = await Restaurant.find(query).sort(sortQuery);
        res.status(200).json({ restaurants });
    } 
    catch(err){
        next(err);
    }
};

exports.updateRestaurant = async(req, res, next) => {
    try {
        const { restaurantId } = req.params
        const restaurant = await Restaurant.findById(restaurantId)
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
        const { restaurantId } = req.params
        const restaurant = await Restaurant.findById(restaurantId)
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