import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Arrow } from '../UI/Arrow';
import { ReviewStar } from '../UI/ReviewStar';

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

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <Arrow direction="left"/>,
        nextArrow: <Arrow direction="right" />,
        responsive: [{
            breakpoint: 1024,
            settings: {
                dots: true,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, 
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-8 mb-4">Top Rated Restaurants</h1>
            {error && <p className="text-red-500 text-center m-4">{error}</p>}
            {topRestaurants.length > 0 && (
                <Slider {...settings} className='mx-4'>
                    {topRestaurants.map((restaurant, idx) => (
                       <div key={idx} className='p-2'>
                            <Card className="bg-white rounded-lg shadow-md p-4">
                            <Link to={`/restaurant/${restaurant.restaurant._id}`}>
                            <div className="rounded-lg overflow-hidden border border-gray-300 h-48" >
                                <img src={restaurant.restaurant.imageUrls[0]} alt={restaurant.restaurant.restaurantName} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex justify-between mb-4 mt-4">
                                <h2 className="text-xl font-semibold">{restaurant.restaurant.restaurantName}</h2>
                                <ReviewStar rating={restaurant.averageRating} />
                            </div>
                            </Link>
                        </Card>
                       </div>
                    ))}
                </Slider>
            )}
        </div>
    );
}

export default TopPicks;