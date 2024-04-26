const Menu = require('../../models/restaurant-related/menu-model')
const Restaurant = require('../../models/restaurant-related/restaurant-model')

exports.createRestaurant = async(req, res, next) => {
    try {
        const { name, phone, email, address, openingHours, workingDays, menu, review, paymentMethods, deliveryCharges } = req.body
        const menuCard = await Menu.findById(menu)
        if(!menuCard) return res.status(404).json({message: 'No associated menu found'})
        const newRestaurant = await Restaurant.create({
            name, 
            phone, 
            email, 
            address, 
            openingHours, 
            workingDays, 
            menu: menuCard._id, 
            review: null,
            paymentMethods, 
            deliveryCharges
        })
        //Associated id of restaurant to menu
        menuCard.restaurant = newRestaurant._id
        await menuCard.save()
        res.status(200).json({message: newRestaurant })
    }
    catch(err){
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