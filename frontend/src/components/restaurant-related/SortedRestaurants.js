import { Link } from "react-router-dom";
import Card from "../UI/Card";
import { ReviewStar } from "../UI/ReviewStar";

export const SortedRestaurants = ({restaurants}) => {
    return (
        <div>
            {restaurants.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
                    {restaurants.map((restaurant, index) => (
                        <Card key={index} className="bg-white rounded-lg shadow-md p-6">
                            <Link key={index} to={`/restaurant/${restaurant._id}`}>
                            <div className="rounded-lg overflow-hidden border border-gray-300" style={{ width: '200px', height: '200px' }}>
                                <img src={restaurant.imageUrls[0]} alt={restaurant.restaurantName} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex justify-between mb-4 mt-4">
                                <div>
                                    <h2 className="text-xl font-semibold">{restaurant.restaurantName}</h2>
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