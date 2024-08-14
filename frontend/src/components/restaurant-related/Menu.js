import { useContext, useEffect, useState } from "react"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { CartContext } from "../../store/Cart-Context";
import { AuthContext } from "../../store/Auth-Context";
import { ErrorDialog } from "../UI/ErrorDialog";

export const Menu = ({menuId}) => {
    const { isAuthenticated } = useContext(AuthContext)
    const { items, addToCart, removeFromCart } = useContext(CartContext)
    const [menu, setMenu] = useState(null)
    const [restaurant, setRestaurant] = useState(null)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMenu = async() => {
            try {
                const response = await fetch(`${process.env.SERVER_URL}/restaurant/menu/${menuId}`)
                const result = await response.json();
                if (!response.ok) {
                    const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
                    setErrors(errorMessages);
                    setLoading(false)
                    return;
                }
                setMenu(result.menu.items);
                setRestaurant(result.menu.restaurant)
                setLoading(false)
            }
            catch(err) {
                setErrors(err.message || "Fetching Menu failed, try again later")
                setLoading(false)
            }
        }
        fetchMenu()
    }, [menuId])

    const closeErrorDialogHandler = () => {
        setErrors(null);
    };

    if(loading) return <div>Loading...</div>

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
                {menu && menu.map((item) => {
                    const cartItem = items.find(cartItem => cartItem.id === item._id)
                    const quantity = cartItem? cartItem.quantity: 0;
                    return (
                    <div key={item._id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4">
                        <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-gray-800 mt-2">&#8377; {item.price}</p>
                        </div>
                        {isAuthenticated && (<div>
                            {quantity === 0? <button onClick={() => addToCart({itemId: item._id, name: item.name, price: item.price,currentRestaurantId: restaurant })} className="bg-orange-100 px-4 py-3 rounded-md">ADD</button>: (
                                 <div className="flex items-center">
                                 <button onClick={() => removeFromCart({itemId: item._id})} className="bg-orange-100 px-3 py-2 rounded-md"><RemoveIcon /></button>
                                 <span className="px-4">{quantity}</span>
                                 <button onClick={() => addToCart({itemId: item._id, name: item.name, price: item.price, currentRestaurantId: restaurant })} className="bg-orange-100 px-3 py-2 rounded-md"><AddIcon /></button>
                             </div>
                            )}
                        </div>)}
                    </div>
                    )
                })}
        </div>
    );
} 