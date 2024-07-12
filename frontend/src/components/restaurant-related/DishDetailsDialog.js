import { useContext, useEffect, useRef } from "react"
import { AuthContext } from "../../store/Auth-Context"
import { CartContext } from "../../store/Cart-Context"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const DishDetailsDialog = ({dish, onClose}) => {
    const { isAuthenticated } = useContext(AuthContext)
    const { items, addToCart, removeFromCart } = useContext(CartContext)
    const dialog = useRef()

    const openModalHandler = () => {
        dialog.current.showModal()
    }

    const closeModalHandler = () => {
        dialog.current.close()
        onClose()
    }

    useEffect(() => (
        openModalHandler()
    ), [])

    const cartItem = items.find(cartItem => cartItem.id === dish._id)
    const quantity = cartItem? cartItem.quantity: 0

    return (
        <div className="flex justify-center items-center">
            <dialog ref={dialog} className='max-w-xl w-full max-h-[60vh] overflow-y-auto p-1 rounded-lg'>
                <div className="relative bg-white rounded-lg p-6">
                    <button className="absolute top-0 right-0 rounded-full shadow-md bg-white text-gray-800 text-4xl" onClick={closeModalHandler}> 
                    &times;
                    </button>
                    <div className="flex items-center">
                        <h2 className="text-xl font-medium">{dish.name}</h2>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-[18px] font-medium">&#8377; {dish.price}</p>
                        {isAuthenticated && (
                            <div className="mr-4">
                                {quantity === 0? (
                                    <button onClick={() => addToCart({itemId: dish._id, name: dish.name, price: dish.price, currentRestaurantId: dish.restaurantId})} className="py-2 px-4 bg-orange-500 text-white border rounded hover:bg-white hover:text-orange-600">ADD</button>
                                ): (
                                 <div className="flex items-center">
                                    <button onClick={() => removeFromCart({itemId: dish._id})} className="bg-orange-100 px-3 py-2 rounded-md"><RemoveIcon /></button>
                                    <span className="px-4">{quantity}</span>
                                    <button onClick={() => addToCart({itemId: dish._id, name: dish.name, price: dish.price, currentRestaurantId: dish.restaurantId})} className="bg-orange-100 px-3 py-2 rounded-md"><AddIcon /></button>
                                </div>
                                )}
                            </div>
                        )}
                    </div>
                    <p className="text-[16px] text-gray-600 mb-4 mt-2 break-words">{dish.description}</p>
                </div>
            </dialog>
        </div>
    )
}