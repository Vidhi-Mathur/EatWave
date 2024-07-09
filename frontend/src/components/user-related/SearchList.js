import { useState } from "react"
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircleIcon from '@mui/icons-material/Circle';

export const SearchList = ({searchResults}) => {
    console.log(searchResults)
    const [active, setActive] = useState('dishes')
    return (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-md">
            <button onClick={() => setActive('restaurants')} className={`py-2 px-6 m-4 text-white rounded-2xl hover:bg-orange-500 focus:outline-none focus:bg-orange-500 ${active === 'restaurants'? 'bg-orange-500': 'bg-orange-400'}`}>Restaurants</button>
            <button onClick={() => setActive('dishes')} className={`py-2 px-6 text-white rounded-2xl hover:bg-orange-500 focus:outline-none focus:bg-orange-500 ${active === 'dishes'? 'bg-orange-500': 'bg-orange-400'}`}>Dishes</button>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4">
                {active === 'dishes' && (
                    searchResults.dishes.map(dish => (
                        <div key={dish._id} className="bg-white shadow-lg p-4 rounded-lg flex flex-col justify-between relative">
                            <div className="flex justify-between items-center m-2">
                                <div className="m-2">
                                    <h3 className="font-semibold text-gray-600 text-sm">By {dish.restaurantName}</h3>
                                    <p className="text-sm text-gray-600 flex items-center mt-1"><StarIcon sx={{ fontSize: 15 }} className="mr-1"/> {dish.restaurantRating}</p>
                                    <hr className="mt-3 border-gray-300 w-[225px]" />
                                </div>
                            </div>
                            <div className="m-2">
                                <h3 className="font-semibold text-md">{dish.name}</h3>
                                <p className="font-semibold text-md">&#8377; {dish.price}</p>
                            </div>
                            <div className="flex justify-between items-center m-2">
                                <button className="py-1 px-4 bg-orange-400 text-white rounded hover:bg-orange-500">ADD</button>
                                <button className="py-1 px-4 bg-transparent text-orange-400 border border-orange-400 rounded hover:bg-orange-400 hover:text-white">More Details</button>
                            </div>
                            <ArrowForwardIcon className="absolute top-8 right-2 text-gray-600" />
                        </div>
                    ))
                )}
                {active === 'restaurants' && (
                    searchResults.restaurants.map(restaurant => (
                        <div key={restaurant._id} className="bg-white shadow-lg p-6 mb-4 rounded-lg flex flex-col justify-between relative">
                            <div className='flex items-center'>
                                <div className="w-24 h-24 mr-4 flex-shrink-0">
                                    <img className='w-full h-full rounded-md object-cover' src={restaurant.imageUrl} alt={restaurant.restaurantName}/>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-md">{restaurant.restaurantName}</h3>
                                    <div className="flex text-gray-600 font-semibold text-sm items-center mt-2">
                                    <StarIcon sx={{ fontSize: 15 }} className="mr-2"/> 
                                    <span className="mr-3">{restaurant.averageRating}</span>
                                    <CircleIcon sx={{ fontSize: 8 }} className="mr-2"/>
                                    <span className="mr-3">&#8377; {restaurant.costForTwo} FOR TWO</span>
                                </div>
                                <p className="mt-2">{restaurant.cuisine.slice(0, 2).join(', ')} {restaurant.cuisine.length > 2 ? '...' : ''}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
