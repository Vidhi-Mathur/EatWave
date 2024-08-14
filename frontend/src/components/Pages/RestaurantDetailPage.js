import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AccessTime, Phone, Email, LocationOn, Restaurant, CurrencyRupee, Star } from '@mui/icons-material';
import { Layout }from "../UI/Layout";
import { Content } from "../UI/Content";
import { Menu } from "../restaurant-related/Menu";
import { Review } from "../restaurant-related/Review";
import { Photos } from "../restaurant-related/Photos";
import { ErrorDialog } from "../UI/ErrorDialog";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import backgroundImage from '../../assets/RestaurantDetailPage.jpeg'

export const RestaurantDetailPage = () => {
    const { restaurantId } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [active, setActive] = useState('menu')
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await fetch(`${process.env.SERVER_URL}/restaurant/${restaurantId}`);
                const result = await response.json();
                if(!response.ok) {
                    const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
                    setErrors(errorMessages);
                    setLoading(false)
                    return;
                }
                setRestaurantDetail(result.restaurant);
                setLoading(false)
            } 
            catch(err) {
                setErrors([err.message || "Failed fetching restaurant details, try again later"])
                setLoading(false)
            }
        };
        fetchRestaurantDetails();
    }, [restaurantId ]);

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }

    return (
        <Layout customisedImageUrl={backgroundImage}>
            <Content>
                {loading && <LoadingSpinner />}
                {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
                {!restaurantDetail && <div className="text-xl font-semibold">No restaurant details found.</div>}
                {restaurantDetail && (
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-4">{restaurantDetail.restaurantName}</h1>
                            <div className="flex items-center space-x-4 text-gray-400 font-semibold">
                                <span className="flex items-center">
                                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                    {restaurantDetail.averageRating.toFixed(1)}
                                </span>
                                <span>•</span>
                                <span>{restaurantDetail.cuisine.join(", ")}</span>
                                <span>•</span>
                                <span className="flex items-center">
                                    <CurrencyRupee className="w-5 h-5 mr-1" />
                                    {restaurantDetail.costForTwo} for two
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <div className="bg-white shadow-lg p-6">
                                    <div className="flex space-x-4 border-b-2 border-gray-200">
                                        <button onClick={() => setActive('menu')} className={`pb-2 pt-2 px-4 text-lg font-semibold ${active === 'menu'? 'border-b-2 border-orange-600 text-orange-600': 'text-gray-600'}`}>
                                        Menu
                                        </button>
                                        <button onClick={() => setActive('reviews')} className={`pb-2 pt-2 px-4 text-lg font-semibold ${active === 'reviews'? 'border-b-2 border-orange-600 text-orange-600': 'text-gray-600'}`}>
                                        Reviews
                                        </button>
                                        <button onClick={() => setActive('photos')} className={`pb-2 pt-2 px-4 text-lg font-semibold ${active === 'photos'? 'border-b-2 border-orange-600 text-orange-600': 'text-gray-600'}`}>
                                        Photos
                                        </button>
                                    </div>
                                    <div>
                                        {active === 'menu' && <Menu menuId={restaurantDetail.menu} />}
                                        {active === 'reviews' && <Review restaurantId={restaurantId} />}
                                        {active === 'photos' && <Photos images={restaurantDetail.imageUrls}/>}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white shadow-lg p-6">
                                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <LocationOn className="w-5 h-5 text-gray-500 mr-2 mt-1" />
                                        <div>
                                            <h3 className="font-semibold">Phone Number</h3>
                                            <p className="text-gray-600">{restaurantDetail.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="w-5 h-5 text-gray-500 mr-2" />
                                        <div>
                                            <h3 className="font-semibold">Address</h3>
                                            <p className="text-gray-600">
                                                {restaurantDetail.address.street}, {restaurantDetail.address.city}, {restaurantDetail.address.state}, {restaurantDetail.address.postalCode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Email className="w-5 h-5 text-gray-500 mr-2" />
                                        <div>
                                            <h3 className="font-semibold">Email</h3>
                                            <p className="text-gray-600">{restaurantDetail.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <AccessTime className="w-5 h-5 text-gray-500 mr-2" />
                                        <div>
                                            <h3 className="font-semibold">Opening Hours</h3>
                                            <p className="text-gray-600">
                                                {restaurantDetail.workingDays.join(', ')}<br />
                                                {restaurantDetail.openingTime} - {restaurantDetail.closingTime}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Restaurant className="w-5 h-5 text-gray-500 mr-2" />
                                        <div>
                                            <h3 className="font-semibold">Food served</h3>
                                            <p className="text-gray-600">{restaurantDetail.foodType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Content>
        </Layout>
    );
}
