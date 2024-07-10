import SearchSharpIcon from '@mui/icons-material/SearchTwoTone';
import { Link } from 'react-router-dom';

export const SuggestionList = ({suggestions, onSearch, query}) => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-md">
            {suggestions.restaurants && suggestions.restaurants.map(restaurant => (
                <Link key={restaurant._id} to={`/restaurant/${restaurant._id}`}>
                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer items-center">
                  <div className='flex items-center'>
                    <img className='w-12 h-12 rounded-md mr-3' src={restaurant.imageUrl} alt={restaurant.restaurantName}/>
                  <div>
                        <span className='font-medium'>{restaurant.restaurantName}</span>
                        <p className="text-sm text-gray-500">Restaurant</p>
                   </div>
                  </div>
                </div>
                </Link>
            ))}
            {suggestions.dishes && suggestions.dishes.map(dish => (
                <div key={dish._id} className="px-4 py-3 hover:bg-gray-100 cursor-pointer items-center" onClick={onSearch}>
                    <span>{dish.name}</span>
                    <p className="text-sm text-gray-500">Dish</p>
                </div>
            ))}
            {query.length > 0 && (
                <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer items-center" onClick={onSearch}>
                    <span><SearchSharpIcon color='info' />See all results for "{query}"</span>
                </div>
            )}
        </div>
    )
}