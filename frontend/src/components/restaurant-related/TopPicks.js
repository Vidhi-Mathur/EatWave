import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from '../UI/Card';
import { Arrow } from '../UI/Arrow';
import { ReviewStar } from '../UI/ReviewStar';
import { ErrorDialog } from '../UI/ErrorDialog';
import { LoadingSpinner } from '../UI/LoadingSpinner';

const TopPicks = () => {
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTopRestaurants = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/review/top-rated-restaurants`);
                const result = await response.json();
                if (!response.ok) {
                    setErrors(result.message)
                    setLoading(false)
                    return;
                }
                setTopRestaurants(result.topRestaurants);
                setLoading(false)
            } 
            catch (err) {
                setErrors(err.message || "Fetching best restaurants failed, try again later")
                setLoading(false)
            }
        };
        fetchTopRestaurants();
    }, []);

    const settings = {
        infinite: topRestaurants.length > 2,
        speed: 500,
        slidesToShow: Math.min(topRestaurants.length, 3),
        slidesToScroll: 1,
        prevArrow: <Arrow direction="left"/>,
        nextArrow: <Arrow direction="right" />,
        responsive: [{
            breakpoint: 1024,
            settings: {
                dots: true,
                infinite: topRestaurants.length > 1,
                slidesToShow: Math.min(topRestaurants.length, 2),
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

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }

    return (
        <div>
            <div className='flex justify-center mt-8 mb-4'>
                <h1 className="text-3xl font-bold text-center text-black bg-white bg-opacity-75 px-4 py-2 rounded-lg shadow-lg">
                    Top Rated Restaurants
                </h1>
            </div>
             {loading && <LoadingSpinner />}
            {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
            {topRestaurants.length > 0 && (
                <Slider {...settings} className='mx-4'>
                    {topRestaurants.map((restaurant) => (
                       <div key={restaurant._id} className='p-2'>
                        <Card className="p-4">
                                <Link to={`/restaurant/${restaurant._id}`} className="flex flex-col h-full">
                                    <div className="relative h-48">
                                        <img src={restaurant.imageUrls[0]} alt={restaurant.restaurantName} className="w-full h-full object-cover" />
                                        {/* ToDo - Manage offers later */}
                                        {/* <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-sm text-sm">Flat 20% off</div> */}
                                    </div>
                                    <div className="p-3 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-grow pr-2">
                                                <h2 className="text-lg font-semibold truncate">{restaurant.restaurantName}</h2>
                                                <p className="text-md text-gray-600 truncate">
                                                    {restaurant.cuisine.slice(0, 2).join(', ')}
                                                    {restaurant.cuisine.length > 2 ? '...' : ''}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <ReviewStar rating={restaurant.averageRating} />
                                                <p className="text-md text-gray-600 mt-1">&#8377;{restaurant.costForTwo} for two</p>
                                            </div>
                                        </div>
                                        <p className="text-md text-gray-500 truncate mt-auto">{restaurant.address.street}, {restaurant.address.city}</p>
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