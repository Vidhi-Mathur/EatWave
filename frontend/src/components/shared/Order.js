import { useContext } from "react"
import { MenuContext } from "../../store/Menu-Context"
import Card from "../UI/Card"
import { AuthContext } from "../../store/Auth-Context";
import Layout from "../UI/Layout";
import { Link } from "react-router-dom";

export const Order = () => {
    const { restaurant, items } = useContext(MenuContext);
    const { token, setToken } = useContext(AuthContext)
    const orderHandler = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const address = Object.fromEntries(form.entries()); 
        const order = {
            restaurant,
            items: items.map(item => ({ item: item.id, quantity: item.quantity})),
            totalCost: items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            ),
            address
        };
        try {
            const response = await fetch('http://localhost:3000/order/place', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : '' 
                },
                body: JSON.stringify(order)
            });
            if (!response.ok) {
                throw new Error('Failed to place order');
            }
            const result = await response.json();
            setToken(result.token);      
            return result;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout>
            <Card>
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
    </form>
    <Link to='/payments'><button type="submit" className="w-full py-2 px-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500">Pay and Order</button></Link>
        </Card>
        </Layout>
    )
}