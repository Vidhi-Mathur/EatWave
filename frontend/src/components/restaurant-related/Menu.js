import { useContext, useEffect, useState } from "react"
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { MenuContext } from "../../store/Menu-Context";

export const Menu = ({id}) => {
    const [menu, setMenu] = useState(null)
    const { items, addToCart, removeFromCart } = useContext(MenuContext)
    useEffect(() => {
        const fetchMenu = async() => {
            try {
                const response = await fetch(`http://localhost:3000/restaurant/menu/${id}`)
                if (!response.ok) {
                    throw new Error("Can't fetch restaurant details");
                }
                const result = await response.json();
                setMenu(result.menu);
            }
            catch(err) {
                console.log(err)
            }
        }
        fetchMenu()
    }, [id])

    if(!menu) return <div>Loading...</div>
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
                {menu.map((item) => {
                    const cartItem = items.find(cartItem => cartItem.id === item._id)
                    const quantity = cartItem? cartItem.quantity: 0;
                    return (
                    <>
                    <div key={item._id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4">
                        <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-gray-800 mt-2">${item.price}</p>
                        </div>
                        <div>
                            {quantity === 0? <button onClick={() => addToCart({itemId: item._id})} className="bg-orange-100 px-4 py-3 rounded-md">ADD</button>: (
                                 <div className="flex items-center">
                                 <button onClick={() => removeFromCart({itemId: item._id})} className="bg-orange-100 px-3 py-2 rounded-md"><RemoveIcon /></button>
                                 <span className="px-4">{quantity}</span>
                                 <button onClick={() => addToCart({itemId: item._id})} className="bg-orange-100 px-3 py-2 rounded-md"><AddIcon /></button>
                             </div>
                            )}
                        </div>
                    </div>
                    </>
                    )
                })}
        </div>
    );
} 