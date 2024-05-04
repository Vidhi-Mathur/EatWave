import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../UI/Layout";
import Content from "../UI/Content";
import { Menu } from "../restaurant-related/Menu";
import { Review } from "../restaurant-related/Review";

const RestaurantDetailPage = () => {
    const { restaurantId } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [showMenu, setShowMenu] = useState(false)
    const [showReviews, setShowReviews] = useState(false)

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/restaurant/${restaurantId}`);
                if (!response.ok) {
                    throw new Error("Can't fetch restaurant details");
                }
                const result = await response.json();
                setRestaurantDetail(result.restaurant);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRestaurantDetails();
    }, [restaurantId]);

    if (!restaurantDetail) return <div>Loading...</div>;

    return (
        <Layout>
            <Content>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{restaurantDetail.name}</h1>
                {/* Restaurant Images */}
                {restaurantDetail.images && restaurantDetail.images.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-2">Images</h2>
                        <div className="flex space-x-4 overflow-x-auto">
                            {restaurantDetail.images.map((image, index) => (
                                <img key={index} alt={`${image}`} src={image} className="h-48 w-auto object-cover rounded-md" />
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex">
                    {/* Left Column */}
                    <div className="w-3/4 mr-4">
                        {/* Overview, Reviews, Menu */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-2">Overview</h2>
                            <div>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Address:</span> {restaurantDetail.address.street}, {restaurantDetail.address.city}, {restaurantDetail.address.state}, {restaurantDetail.address.postalCode}</p>
                                <p className="text-gray-700 mb-2"><span className="font-semibold">Opening Hours:</span></p>
                                <ul>
                                    {Object.entries(restaurantDetail.openingHours).map(([day, hours]) => (
                                        <li key={day}>{day}: {hours}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="mb-8">
                            <button onClick={() => setShowMenu(!showMenu)} className="bg-orange-600 text-white px-4 py-2 rounded-md">Show Menu</button>
                            {showMenu && <Menu menuId={restaurantDetail.menu} />}
                        </div>

                        {/* Reviews */}
                        <div className="mb-8">
                            <button onClick={() => setShowReviews(!showReviews)} className="bg-orange-600 text-white px-4 py-2 rounded-md">Show Reviews</button>
                            {showReviews && <Review restaurantId={restaurantId} />}
                        </div>
                        
                    </div>

                    {/* Right Column */}
                    <div className="w-1/4">
                        {/* Phone Number */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-2">Contact</h2>
                            <p className="text-gray-700">{restaurantDetail.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
            </Content>
        </Layout>
    );
}

export default RestaurantDetailPage;