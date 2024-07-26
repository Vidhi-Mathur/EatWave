import { createContext, useState} from "react";
import { Alert } from "../components/UI/Alert";

export const CartContext = createContext({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    restaurantId: null,
    setRestaurantId: null
});

export const CartCtxProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [restaurantId, setRestaurantId] = useState(null);
    const [alert, setAlert] = useState(null)


    const confirmHandler = () => {
        setCart({ items: [{ id: alert.itemId, name: alert.name, quantity: 1, price: alert.price }] });
        //Clear previous and add current
        setRestaurantId(alert.currentRestaurantId);
        setAlert(null)
    }

    const cancelHandler = () => {
        setAlert(null)
    }

    const addToCart = ({ itemId, name, price, currentRestaurantId }) => {
        //If there's no existing cart, create a new one
        if (!restaurantId) {
            setRestaurantId(currentRestaurantId);
            setCart({ items: [{ id: itemId, name, quantity: 1, price }] });
        } 
        //If switching restaurants, show alert
        else if (restaurantId !== currentRestaurantId) {
            setAlert({ itemId, name, price, currentRestaurantId });
        } 
        // Add to existing cart
        else {
            addItemToCart({ itemId, name, price, currentRestaurantId });
        }
    };

    const addItemToCart = ({itemId, name, price, currentRestaurantId }) => {
        setCart((prevCart) => {
            let newCart = [...prevCart.items];
            let currentItemIdx = newCart.findIndex((item) => item.id === itemId);
            let newItem;
            if (currentItemIdx !== -1) {
                newItem = {
                    ...newCart[currentItemIdx],
                    quantity: newCart[currentItemIdx].quantity + 1
                };
                newCart[currentItemIdx] = newItem;
            } 
            else {
                newItem = {
                    id: itemId,
                    name,
                    quantity: 1,
                    price
                };
                newCart.push(newItem);
            }
            return {
                items: newCart
            };
        });
        if(restaurantId !== currentRestaurantId){
            setRestaurantId(currentRestaurantId);
        }
    };


    const removeFromCart = ({ itemId }) => {
        setCart((prevCart) => {
            const newCart = [...prevCart.items];
            const currentItemIdx = newCart.findIndex((item) => item.id === itemId);
            if (currentItemIdx !== -1) {
                if (newCart[currentItemIdx].quantity > 1) {
                    newCart[currentItemIdx].quantity -= 1;
                } else {
                    newCart.splice(currentItemIdx, 1);
                }
            }
            return {
                items: newCart
            };
        });
    };

    const ctxValue = {
        items: cart.items,
        addToCart,
        removeFromCart,
        restaurantId,
        setRestaurantId
    };

    return <CartContext.Provider value={ctxValue}>
        {children}
        {alert && (
            <Alert onConfirm={confirmHandler} onCancel={cancelHandler}/>
        )}
    </CartContext.Provider>;
};
