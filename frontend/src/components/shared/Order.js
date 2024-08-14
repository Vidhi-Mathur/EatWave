import { useCallback, useContext, useState } from "react";
import { CartContext } from "../../store/Cart-Context";
import { AuthContext } from "../../store/Auth-Context";
import { Card } from "../UI/Card";
import { Layout }from "../UI/Layout";
import { ErrorDialog } from "../UI/ErrorDialog";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../assets/OrderPage.jpeg'

export const Order = () => {
    const { restaurantId, items, finalCost, clearCart } = useContext(CartContext);
    const { token, fetchRefreshToken } = useContext(AuthContext)
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()

    const fetchWithAuth = useCallback(async (url, options) => {
        let response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            try {
                const refreshResult = await fetchRefreshToken();
                if (refreshResult.accessToken) {
                    response = await fetch(url, {
                        ...options,
                        headers: {
                            ...options.headers,
                            'Authorization': `Bearer ${refreshResult.accessToken}`
                        }
                    });
                } 
                else {
                    setErrors(['Session expired. Please log in again.']);
                    return
                }
            } 
            catch (error) {
                setErrors(['Session expired. Please log in again.']);
                navigate('/login');
            }
        }

        return response;
    }, [token, fetchRefreshToken, navigate]);

    const orderHandler = async (e) => {
        e.preventDefault();

        if (typeof window.Razorpay === 'undefined') {
            setErrors("Razorpay SDK not loaded. Please check your internet connection or try again later.");
            return;
        }

        const form = new FormData(e.target);
        const address = Object.fromEntries(form.entries());
        const checkoutOrder = {
            restaurant: restaurantId,
            items: items.map(item => ({ item: item.id, name: item.name, quantity: item.quantity, price: item.price })),
            totalAmount: finalCost
        };

        try {
            const checkoutResponse = await fetchWithAuth(`${process.env.SERVER_URL}/order/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutOrder)
            });

            const checkoutResult = await checkoutResponse.json()
            
            if (!checkoutResponse.ok) {
                const errorMessages = checkoutResult.errors ? checkoutResult.errors.map(err => err.msg) : [checkoutResult.message];
                setErrors(errorMessages);
                return;
            }

            const options = {
                key: checkoutResult.key,
                amount: Math.round(finalCost * 100),
                currency: "INR",
                name: "EatWave",
                description: "Payment for your order",
                order_id: checkoutResult.order,
                handler: async (response) => {
                    try {
                        const orderResult = await fetchWithAuth(`${process.env.SERVER_URL}/order/place`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                restaurant: restaurantId,
                                items: checkoutOrder.items,
                                totalCost: checkoutOrder.totalAmount,
                                address,
                                payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                signature: response.razorpay_signature
                            })
                        });

                        const orderResponse = await orderResult.json();

                        if(!orderResult.ok){
                            const errorMessages = orderResponse.errors ? orderResponse.errors.map(err => err.msg) : [orderResponse.message];
                            setErrors(errorMessages);
                            return;
                        } 
                        else {
                            clearCart()
                            navigate('/my-account/orders');
                        }
                    }
                    catch (err){
                        setErrors(err.message || "Placing order failed, try again later");
                        return
                    }
                },
                theme: {
                    color: "#F37254"
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } 
        catch (err) {
            setErrors(err.message || "Placing order failed, try again later");
            return
        }
    };

    const closeErrorDialogHandler = () => {
        setErrors(null);
    };
    

    return (
        <Layout customisedImageUrl={backgroundImage}>
            <Card className="p-6">
                {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler} />}
                <form className="space-y-4" onSubmit={orderHandler}>
                    <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                        <input type="text" name="street" placeholder="Street" required className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" placeholder="City" required className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <input type="text" name="state" placeholder="State" required className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input type="text" name="postalCode" placeholder="Postal Code" required className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500">Pay and Order</button>
                </form>
            </Card>
        </Layout>
    )
}