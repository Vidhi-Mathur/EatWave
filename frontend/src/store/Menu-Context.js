import { createContext, useState } from "react";

export const MenuContext = createContext({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {}
})

export const MenuCtxProvider = ({children}) => {
    const [cart, setCart] = useState({
        items: []
    })

    const addToCart = ({itemId, name, price}) => {
        setCart((prevCart) => {
            //Copy
            let newCart = [...prevCart.items]
            //Find index
            let currentItemIdx = newCart.findIndex((item) => item.id === itemId)
            //Find corresponding item
            let currentItem = newCart[currentItemIdx]
            let newItem
            //Increase quantity if, exist in cart
            if(currentItem){
                newItem = {
                    ...currentItem,
                    quantity: currentItem.quantity + 1
                }
                //Replace
                newCart[currentItemIdx] = newItem
            }
            //Default quantity as 1
            else {
                newItem = {
                    id: itemId,
                    name,
                    quantity: 1,
                    price
                }
                newCart.push(newItem)
            }
            return {
                items: newCart
            }
        })
    }
    const removeFromCart = ({itemId}) => {  
        setCart((prevCart) => {
            //Copy
            const newCart = [...prevCart.items]
            //Find index
            const currentItemIdx = newCart.findIndex((item) => item.id === itemId)
            //Find corresponding item
            const currentItem = newCart[currentItemIdx]
            //If quantity is more than 1, decrease
            if(currentItem.quantity > 1){
                let updatedItem = {
                    ...currentItem,
                    quantity: currentItem.quantity - 1
                }
                newCart[currentItemIdx] = updatedItem
            }
            //Remove
            else {
                newCart.splice(currentItemIdx, 1)
            }
            return {
                items: newCart
            }
        })
    }

    const ctxValue = {
        items: cart.items,
        addToCart,
        removeFromCart
    }

    return <MenuContext.Provider value={ctxValue}>{children}</MenuContext.Provider>
}