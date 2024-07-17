const Restaurant= require("../../models/restaurant-related/restaurant-model")
const Order = require("../../models/shared/order-model")
const Review = require("../../models/shared/review-model")
const User = require("../../models/user-related/user-model")


const calculateAndUpdateAverageRating = async(restaurantId) => {
    try {
        const reviews = await Review.find({ restaurant: restaurantId })
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = reviews.length > 0? totalRating/reviews.length: 0
        await Restaurant.findByIdAndUpdate(restaurantId, { averageRating })
    }
    catch(err) {
        console.log(`Error at restaurant ${restaurantId}`)
    }
 }

exports.postReviews = async(req, res, next) => {
    try {
        const { orderId } = req.params
        const reviewer = req.user._id
        const { restaurant, rating, comments, imageUrl } = req.body  
        const existingOrder = await Order.findById(orderId)
        if(!existingOrder) return res.status(404).json({message: 'No order found'})
        const existingRestaurant = await Restaurant.findById(restaurant)
        if(!existingRestaurant) return res.status(404).json({message: 'No restaurant found'})
        const existingReviewer = await User.findById(reviewer)
        if(!existingReviewer) return res.status(404).json({message: 'No user found'})
        const review = new Review({
            order: orderId,
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
        await calculateAndUpdateAverageRating(restaurant)
        res.status(200).json({ review })
    }
    catch(err) {
        next(err)
    }
}

exports.getReviewByOrderId = async(req, res, next) => {
   try {
        const { orderId } = req.params
        const order = await Order.findById(orderId)
        if(!order) return res.status(404).json({message: 'Order not found'})
        const review = await Review.find({ order: orderId })
        res.status(200).json({ review })
   }
   catch(err) {
        next(err)
   }
}

exports.getReviewsByRestaurantId = async(req, res, next) => {
    try {
        const { restaurantId } = req.params
        const restaurant = await Restaurant.findById(restaurantId)
        if(!restaurant) return res.status(404).json({message: 'Restaurant not found'})
        //To populate reviewer field with corresponding user's name
        const reviews = await Review.find({ restaurant: restaurantId }).populate('reviewer', 'name')
        res.status(200).json({ reviews })
    }
    catch(err) {
        next(err)
    }
}

exports.updateReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { rating, comments, imageUrl } = req.body;
        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'No such review posted' });
        review.rating = rating;  
        review.comments = comments;
        review.imageUrl = imageUrl  
        await review.save();
        await calculateAndUpdateAverageRating(review.restaurant)
        res.status(200).json({ review });
    } catch (err) {
        next(err);
    }
};

exports.getTopRatedRestaurants = async(req, res, next) => {
    try {
        //Fetch all restaurants
        const topRestaurants = await Restaurant.find({}).sort({ averageRating: -1}).limit(10)
        res.status(200).json({ topRestaurants })
    }
    catch(err) {
        next(err)
    }
}