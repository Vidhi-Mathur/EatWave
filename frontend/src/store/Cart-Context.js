import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { getCartAPI, updateCartAPI } from "../services/CartService";
import { AuthContext } from "./Auth-Context";

export const CartContext = createContext({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    restaurant: null
});

export const CartCtxProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [cart, setCart] = useState({ items: [] });
    const [restaurantId, setRestaurantId] = useState(null);
    let batchedCartUpdatesRef = useRef([]);
    
    useEffect(() => {
        const fetchCart = async () => {
            const loadedCart = await getCartAPI(token);
            setCart({ items: loadedCart.items || [] });
            setRestaurantId( loadedCart.restaurant || null );
        };
        if(token){
            fetchCart();
        }
    }, [token]);

    //Function and wait as arguments to limit calling function if case no activity within "wait"
    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            const context = this;
            //Reset if activity happns
            clearTimeout(timeout);
            //Wait to call
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };

    const processBatchedUpdates = useCallback(debounce(async () => {
        if (batchedCartUpdatesRef.current.length > 0) {
            try {
                await updateCartAPI(token, { updates: batchedCartUpdatesRef.current, restaurant: restaurantId });
                batchedCartUpdatesRef.current = [];
            } 
            catch (err) {
                throw new Error(err || "Failed updating cart")
            }
        }
    }, 300), [token, restaurantId])

    const addToCart = ({ itemId, name, price }) => {
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
            } else {
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
        restaurant: restaurantId
    };

    return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
};
