import { useContext, useState } from "react";
import { CartContext } from "../../store/Cart-Context"
import Card from "../UI/Card"
import { AuthContext } from "../../store/Auth-Context";
import Layout from "../UI/Layout";

export const Order = () => {
    const { restaurant, items } = useContext(CartContext);
    const { token, setToken } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const orderHandler = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const address = Object.fromEntries(form.entries()); 
        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const checkoutOrder = {
            restaurant,
            items: items.map(item => ({ item: item.id, name: item.name, quantity: item.quantity, price: item.price})),
            totalAmount
        };
        try {
            const checkoutResponse = await fetch('http://localhost:3000/order/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '' 
                },
                body: JSON.stringify(checkoutOrder)
            });
            const checkoutResult = await checkoutResponse.json();
            if (!checkoutResponse.ok){
                setError(checkoutResult.message)
                return;
            }
            setToken(checkoutResult.token);      
            const options = {
                key: checkoutResult.key,
                amount: totalAmount * 100,
                currency: "INR",
                name: "EatWave",
                description: "Payment for your order",
                order_id: checkoutResult.order,
                handler: async (response) => {
                    const orderResult = await fetch('http://localhost:3000/order/place', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token? `Bearer ${token}`: ' ' 
                        },
                        body: JSON.stringify({
                            restaurant,
                            items: checkoutOrder.items,
                            totalCost: totalAmount,
                            address,
                            payment_id: response.razorpay_payment_id,
                            order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature
                        })
                    });
                    if (!orderResult.ok) {
                        setError('Order placement failed.');
                    }
                    else window.location.href = '/my-account'
                }
            };
            const razorpay = new window.Razorpay(options);
            razorpay.open();
            return checkoutResult;
        } catch (err) {
            console.log(err)
            setError("Placing order failed, try again later")
        }
    };

    return (
        <Layout>
            <Card className="p-6">
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