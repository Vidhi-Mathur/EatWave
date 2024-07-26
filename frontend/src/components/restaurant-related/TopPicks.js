import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../UI/Card';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Arrow } from '../UI/Arrow';
import { ReviewStar } from '../UI/ReviewStar';
import { ErrorDialog } from '../UI/ErrorDialog';

const TopPicks = () => {
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTopRestaurants = async () => {
            try {
                const response = await fetch('http://localhost:3000/review/top-rated-restaurants');
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

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }

    return (
        <div>
             <h1 className="text-3xl font-bold text-center mt-8 mb-4 text-black bg-white bg-opacity-75 px-4 py-2 rounded-lg shadow-lg inline-block ml-[600px]">Top Rated Restaurants</h1>
             {loading && (
                    <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
            )}
            {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
            {topRestaurants.length > 0 && (
                <Slider {...settings} className='mx-4'>
                    {topRestaurants.map((restaurant, idx) => (
                       <div key={idx} className='p-2'>
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