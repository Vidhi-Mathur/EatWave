const Restaurant= require("../../models/restaurant-related/restaurant-model")
const Order = require("../../models/shared/order-model")
const Review = require("../../models/shared/review-model")
const User = require("../../models/user-related/user-model")

exports.postReviews = async(req, res, next) => {
    try {
        const order  = req.params.order
        const reviewer = req.user._id
        const { restaurant, rating, comments, imageUrl } = req.body  
        const existingOrder = await Order.findById(order)
        if(!existingOrder) return res.status(404).json({message: 'No order found'})
        const existingRestaurant = await Restaurant.findById(restaurant)
        if(!existingRestaurant) return res.status(404).json({message: 'No restaurant found'})
        const existingReviewer = await User.findById(reviewer)
        if(!existingReviewer) return res.status(404).json({message: 'No user found'})
        const review = new Review({
            order,
            restaurant,
            reviewer,
            rating,
            comments,
            imageUrl
        })
        await review.save()
        //Save in Order, to later retrieve reviews for individual order
        existingOrder.review = review._id
        await existingOrder.save()
        //Save in Restaurants, to let users see where to order from
        existingRestaurant.reviews.push(review._id)
        await existingRestaurant.save()
        //Save in Users, to track own reviews
        existingReviewer.reviews.push(review._id)
        await existingReviewer.save()
        res.status(200).json({ review })
    }
    catch(err) {
        next(err)
    }
}

exports.getReviewByOrderId = async(req, res, next) => {
   try {
        const id = req.params.order
        const order = await Order.findById(id)
        if(!order) return res.status(404).json({message: 'Order not found'})
        const review = await Review.find({ order: id })
        res.status(200).json({ review })
   }
   catch(err) {
        next(err)
   }
}

exports.getReviewsByRestaurantId = async(req, res, next) => {
    try {
        const id = req.params.restaurant
        const restaurant = await Restaurant.findById(id)
        if(!restaurant) return res.status(404).json({message: 'Restaurant not found'})
        //To populate reviewer field with corresponding user's name
        const reviews = await Review.find({ restaurant: id }).populate('reviewer', 'name')
        res.status(200).json({ reviews })
    }
    catch(err) {
        next(err)
    }
}

exports.getReviewsByUserId = async(req, res, next) => {
    try {
        const id = req.params.user
        const user = await User.findById(id)
        if(!user) return res.status(404).json({message: 'User not found'})
        const reviews = await Review.find({ reviewer: id }).select('_id')
        res.status(200).json({ reviews })
    }
    catch(err) {
        next(err)
    }
}

exports.updateReview = async (req, res, next) => {
    try {
        const id = req.params.review;
        const { rating, comments, imageUrl } = req.body;
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: 'No such review posted' });
        review.rating = rating;  
        review.comments = comments;
        review.imageUrl = imageUrl  
        await review.save();
        res.status(200).json({ review });
    } catch (err) {
        next(err);
    }
};

exports.getAverageRating = async(req, res, next) => {
   try {
        const id = req.params.restaurant
        const restaurant = await Restaurant.findById(id)
        if(restaurant) return res.status(404).json({message: 'Restaurant not found'})
        const reviews = await Review.find({ restaurant: id })
        if(reviews.length === 0) return res.status(404).json({message: 'No ratings found for given restaurant'})
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = totalRating/reviews.length
        res.status(200).json({ averageRating })
   }
   catch(err) {
        next(err)
   }
}

exports.getTopRatedRestaurants = async(req, res, next) => {
    try {
        //Fetch all restaurants
        const restaurants = await Restaurant.find({})
        const restaurantRating = []
        for(const restaurant of restaurants){
            const reviews = await Review.find({ restaurant: restaurant._id })
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
            const averageRating = reviews.length > 0? totalRating/reviews.length: 0
            restaurantRating.push({ restaurant, averageRating })
        }
        //Sort
        restaurantRating.sort((a, b) => b.averageRating - a.averageRating)
        const topRestaurants = restaurantRating.slice(0, 10)
        res.status(200).json({ topRestaurants })
    }
    catch(err) {
        next(err)
    }
}