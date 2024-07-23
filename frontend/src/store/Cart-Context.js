import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { getCartAPI, updateCartAPI } from "../services/CartService";
import { AuthContext } from "./Auth-Context";
import { debounce } from "../util/debounce";
import { Alert } from "../components/UI/Alert";

export const CartContext = createContext({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    restaurantId: null,
    setRestaurantId: null
});

export const CartCtxProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [cart, setCart] = useState({ items: [] });
    const [restaurantId, setRestaurantId] = useState(null);
    const [alert, setAlert] = useState(null)
    let batchedCartUpdatesRef = useRef([]);
    
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const loadedCart = await getCartAPI(token);
                setCart({ items: loadedCart.items || [] });
                setRestaurantId(loadedCart.restaurant ? loadedCart.restaurant._id : null);
            } 
            catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };
        if(token){
            fetchCart();
        }
    }, [token]);

    const processBatchedUpdates = useCallback(debounce(async () => {
        if (batchedCartUpdatesRef.current.length > 0) {
            try {
                await updateCartAPI(token, { updates: batchedCartUpdatesRef.current, restaurant: restaurantId });
                batchedCartUpdatesRef.current = [];
            } 
            catch (err) {
                throw new Error("Failed updating cart");
            }
        }
    }, 300), [token, restaurantId]);

    const confirmHandler = () => {
        setCart({ items: [{ id: alert.itemId, name: alert.name, quantity: 1, price: alert.price }] });
        //Clear previous and add current
        setRestaurantId(alert.currentRestaurantId);
        batchedCartUpdatesRef.current = [{ type: 'clear'}, { type: 'add', itemId: alert.itemId, name: alert.name, price: alert.price }];
        processBatchedUpdates();
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
            batchedCartUpdatesRef.current = [{ type: 'add', itemId, name, price }];
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
        batchedCartUpdatesRef.current.push({ type: 'add', itemId, name, price });
        processBatchedUpdates();
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
        batchedCartUpdatesRef.current.push({ type: 'remove', itemId });
        processBatchedUpdates();
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
