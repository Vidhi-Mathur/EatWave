import { Link } from "react-router-dom";
import Card from "../UI/Card";
import { ReviewStar } from "../UI/ReviewStar";

export const SortedRestaurants = ({restaurants}) => {
    return (
        <div>
            {restaurants.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    {restaurants.map((restaurant) => (
                        <div key={restaurant._id} className="w-full h-[360px]">
                            <Card className="p-0">
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
                </div>
            )}
        </div>
    );
}