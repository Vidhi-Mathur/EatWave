import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../UI/Layout";
import Card from "../UI/Card";

const RestaurantDetailPage = () => {
    const { id } = useParams();
    const [restaurantDetail, setRestaurantDetail] = useState(null);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/restaurant/${id}`);
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
    }, [id]);

    if (!restaurantDetail) return <div>Loading...</div>;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-h-[calc(100vh-98px)] overflow-y-auto">
            <Card>
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

                        {/* Reviews */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                            {restaurantDetail.reviews.map((review, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-gray-700 mb-2">{review.user}: {review.comment}</p>
                                    <div className="flex items-center">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Menu */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-2">Menu</h2>
                            {/* Render menu items here */}
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
            </Card>
            </div>
        </Layout>
    );
}

export default RestaurantDetailPage;