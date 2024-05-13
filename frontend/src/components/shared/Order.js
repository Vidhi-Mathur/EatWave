import { useContext, useState } from "react";
import { MenuContext } from "../../store/Menu-Context"
import Card from "../UI/Card"
import { AuthContext } from "../../store/Auth-Context";
import Layout from "../UI/Layout";
import { loadStripe } from "@stripe/stripe-js"

export const Order = () => {
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
    const { restaurant, items } = useContext(MenuContext);
    const { token, setToken } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const orderHandler = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const address = Object.fromEntries(form.entries()); 
        // First, make the payment
        const paymentOrder = {
            restaurant,
            items: items.map(item => ({ item: item.id, name: item.name, quantity: item.quantity, price: item.price})),
        };
        try {
            const paymentResponse = await fetch('http://localhost:3000/order/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '' 
                },
                body: JSON.stringify(paymentOrder)
            });
            const paymentResult = await paymentResponse.json();
            if (!paymentResponse.ok){
                setError(paymentResult.message)
                return;
            }
            const stripe = await loadStripe(publishableKey);
            // Redirect to Stripe checkout for payment
            await stripe.redirectToCheckout({
                sessionId: paymentResult.session
            });
            // Once payment is successful, place the order
            const order = {
                restaurant,
                items: items.map(item => ({ item: item.id, name: item.name, quantity: item.quantity, price: item.price})),
                totalCost: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                address,
                session: paymentResult.session
            };
            const orderResponse = await fetch('http://localhost:3000/order/place', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '' 
                },
                body: JSON.stringify(order)
            });
            const orderResult = await orderResponse.json(); 
            if (!orderResponse.ok){
                setError(orderResult.message)
                return;
            }
            setToken(orderResult.token);      
            return orderResult;
        } catch (err) {
            setError("Placing order failed, try again later")
        }
    };

    return (
        <Layout>
            <Card>
                {error && <p className="text-red-500 text-center m-4">{error}</p>}
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