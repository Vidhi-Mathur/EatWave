import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircleIcon from '@mui/icons-material/Circle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { CartContext } from "../../store/Cart-Context";
import { AuthContext } from "../../store/Auth-Context";

export const SearchList = ({searchResults, query}) => {
    const { isAuthenticated } = useContext(AuthContext)
    const { items, addToCart, removeFromCart } = useContext(CartContext)
    const [active, setActive] = useState('dishes')
    
    return (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-md">
            <button onClick={() => setActive('restaurants')} className={`py-2 px-6 m-4 text-white rounded-2xl hover:bg-orange-500 focus:outline-none focus:bg-orange-500 ${active === 'restaurants'? 'bg-orange-500': 'bg-orange-400'}`}>Restaurants</button>
            <button onClick={() => setActive('dishes')} className={`py-2 px-6 text-white rounded-2xl hover:bg-orange-500 focus:outline-none focus:bg-orange-500 ${active === 'dishes'? 'bg-orange-500': 'bg-orange-400'}`}>Dishes</button>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 p-4">
                {active === 'dishes' && (
                    searchResults.dishes && searchResults.dishes.length > 0? (
                        searchResults.dishes.map(dish => {
                            const cartItem = items.find(cartItem => cartItem.id === dish._id)
                            const quantity = cartItem? cartItem.quantity: 0
                            return (
                                <div key={dish._id} className="bg-white shadow-lg p-4 rounded-lg flex flex-col justify-between relative">
                                <Link to={`/restaurant/${dish.restaurantId}`} className="flex justify-between items-center m-2">
                                    <div className="mt-2">
                                        <h3 className="font-semibold text-gray-600 text-sm">By {dish.restaurantName}</h3>
                                        <p className="text-sm text-gray-600 flex items-center mt-1"><StarIcon sx={{ fontSize: 15 }} className="mr-1"/> {dish.restaurantRating}</p>
                                        <hr className="mt-3 border-gray-300 w-[225px]" />
                                    </div>
                                </Link>
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <h3 className="font-semibold text-md">{dish.name}</h3>
                                        <p className="font-semibold text-md">&#8377; {dish.price}</p>
                                    </div>
                                    {isAuthenticated && (
                                    <div>
                                        {quantity === 0? (
                                            <button onClick={() => addToCart({itemId: dish._id, name: dish.name, price: dish.price})} className="py-2 px-4 bg-orange-500 text-white border rounded hover:bg-white hover:text-orange-600">ADD</button>
                                        ): (
                                         <div className="flex items-center">
                                            <button onClick={() => removeFromCart({itemId: dish._id})} className="bg-orange-100 px-3 py-2 rounded-l-md"><RemoveIcon /></button>
                                            <span className="px-4">{quantity}</span>
                                            <button onClick={() => addToCart({itemId: dish._id, name: dish.name, price: dish.price})} className="bg-orange-100 px-3 py-2 rounded-md"><AddIcon /></button>
                                        </div>
                                        )}
                                    </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center mt-5 mb-2">
                                    {/* Empty div to push More Details to the right */}
                                    <div></div> 
                                    <button className="py-1 px-4 bg-transparent text-orange-400 border border-orange-400 rounded hover:bg-orange-400 hover:text-white">More Details</button>
                                </div>
                                <Link to={`/restaurant/${dish.restaurantId}`}><ArrowForwardIcon className="absolute top-8 right-2 text-gray-600" /></Link>
                            </div>
                            )
                        })
                    ): (
                        <p className="col-span-2 text-center font-semibold">No match found for "{query}</p>
                    )
                )}
                {active === 'restaurants' && (
                    searchResults.restaurants && searchResults.restaurants.length > 0? (
                        searchResults.restaurants.map(restaurant => (
                            <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id} className="bg-white shadow-lg p-6 mb-4 rounded-lg flex flex-col justify-between relative">
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
                            </Link>
                        ))
                    ): (
                        <p className="col-span-2 text-center font-semibold">No match found for "{query}</p>
                    )
                )}
            </div>
        </div>
    )
}
