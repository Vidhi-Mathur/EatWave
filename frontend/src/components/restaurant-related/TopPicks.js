import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import StarIcon from '@mui/icons-material/Star';

const ReviewStar = ({ rating }) => (
    <button className="bg-orange-600 text-white px-2 py-1 rounded-md"><StarIcon style={{color: 'ghostwhite'}} /> {rating}</button>
);

const TopPicks = () => {
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTopRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:3000/review/top-rated-restaurants');
                const result = await response.json();
                if (!response.ok) {
                    setError(result.message)
                    return;
                }
                setTopRestaurants(result.topRestaurants);
            } catch (err) {
                setError("Fetching best restaurants failed, try again later")
            }
        };
        fetchTopRestaurants();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Top Rated Restaurants</h1>
            {error && <p className="text-red-500 text-center m-4">{error}</p>}
            {topRestaurants.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topRestaurants.map((restaurant, index) => (
                        <Card key={index} className="bg-white rounded-lg shadow-md p-6">
                            <Link key={index} to={`/restaurant/${restaurant.restaurant._id}`}>
                            <div className="rounded-lg overflow-hidden border border-gray-300" style={{ width: '200px', height: '200px' }}>
                                <img src={restaurant.restaurant.imageUrl} alt={restaurant.restaurant.restaurantName} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex justify-between mb-4 mt-4">
                                <div>
                                    <h2 className="text-xl font-semibold">{restaurant.restaurant.restaurantName}</h2>
                                </div>
                                <ReviewStar rating={restaurant.averageRating} />
                            </div>
                            </Link>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TopPicks;