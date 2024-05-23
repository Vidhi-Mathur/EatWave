import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../store/Auth-Context";

const formattedDate = (dateString) => {
    const options = { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const PastOrders = () => {
    const { token, setToken } = useContext(AuthContext);
    const [orders, setOrders] = useState(null);
    useEffect(() => {
        const fetchPastOrders = async () => {
            try {
                const response = await fetch("http://localhost:3000/order/user_history", {
                    headers: {
                        'Authorization': token ? `Bearer ${token}` : ' '
                    }
                });
                if (!response.ok) {
                    throw new Error("No orders found, try again later");
                }
                const result = await response.json();
                console.log(result)
                setToken(result.token)
                setOrders(result.orders);
                return result
            } catch (error) {
                console.error(error);
            }
        };
        fetchPastOrders();
    }, [token, setToken]);

    return (
        <div>
            <h1>Past Orders</h1>
            <ul>
                {orders && orders.map(order => (
                    <li key={order._id}>
                        <h1>ORDER #{order._id}</h1>
                        <p>from {order.restaurant.name}</p>
                        <p>Ordered on {formattedDate(order.createdAt)}</p>
                        <p>Total Paid: Rs. {order.totalCost}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
