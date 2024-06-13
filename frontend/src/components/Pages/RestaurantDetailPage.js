import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../UI/Layout";
import Content from "../UI/Content";
import { Menu } from "../restaurant-related/Menu";
import { Review } from "../restaurant-related/Review";
import { MenuContext } from "../../store/Menu-Context";

const RestaurantDetailPage = () => {
    const { restaurantId } = useParams();
    const { setRestaurantId } = useContext(MenuContext)
    const [restaurantDetail, setRestaurantDetail] = useState(null);
    const [active, setActive] = useState('menu')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/restaurant/${restaurantId}`);
                if (!response.ok) {
                    throw new Error("Can't fetch restaurant details");
                }
                const result = await response.json();
                setRestaurantDetail(result.restaurant);
                setRestaurantId(result.restaurant._id)
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        };
        fetchRestaurantDetails();
    }, [restaurantId, setRestaurantId]);


    return (
        <Layout>
            <Content>
            {loading? <div>Loading...</div>: (
                <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">{restaurantDetail.restaurantName}</h1>
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
                                {restaurantDetail?.workingDays?.map((day) => (
                                            <li key={day}>{day}: {restaurantDetail?.openingTime} - {restaurantDetail?.closingTime}</li>
                                ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="flex space-x-4 border-b-2 border-gray-200">
                                <button onClick={() => setActive('menu')} className={`pb-2 pt-2 px-4 text-lg font-semibold ${active === 'menu'? 'border-b-2 border-orange-600 text-orange-600': 'text-gray-600'}`}>
                                Menu
                                </button>
                                <button onClick={() => setActive('reviews')} className={`pb-2 pt-2 px-4 text-lg font-semibold ${active === 'reviews'? 'border-b-2 border-orange-600 text-orange-600': 'text-gray-600'}`}>
                                Reviews
                                </button>
                            </div>
                            <div>
                                {active === 'menu' && <Menu menuId={restaurantDetail.menu} />}
                                {active === 'reviews' && <Review restaurantId={restaurantId} />}
                            </div>
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
            )}
            </Content>
        </Layout>
    );
}

export default RestaurantDetailPage;