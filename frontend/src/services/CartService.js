export const getCartAPI = async (token) => {
    const response = await fetch('http://localhost:3000/cart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to get cart");
    }
    const result = await response.json();
    return result;
};

export const updateCartAPI = async (token, { updates, restaurant }) => {
    const response = await fetch('http://localhost:3000/cart/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ updates, restaurant })
    });
    if (!response.ok) {
        throw new Error("Failed to update cart");
    }
    const result = await response.json();
    return result;
};