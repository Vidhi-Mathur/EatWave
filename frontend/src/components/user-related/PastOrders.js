import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../store/Auth-Context";
import { AddReview } from "./AddReview";

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
    const { token, fetchRefreshToken } = useContext(AuthContext);
    const [ orders, setOrders ] = useState(null);
    const [ review, setReview ] = useState({})
    const dialog = useRef()

    const openModalHandler = (orderId) => {
        dialog.current.showModal()
        setReview(prev => ({...prev, currentOrder: orderId}))
    }

    const fetchReviewByOrderId = async(orderId) => {
        try {
            let response = await fetch(`http://localhost:3000/review/order/${orderId}`, {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ' '
                }
            });
            if(!response.ok) {
                if(response.status === 401){
                    const refreshResponse = await fetchRefreshToken()
                    if(refreshResponse){
                        response = await fetch(`http://localhost:3000/review/order/${orderId}`, {
                            headers: {
                                'Authorization': `Bearer ${refreshResponse.accessToken}`
                            }
                        });
                        if(!response.ok) {
                            throw new Error("Can't fetch reviews , try again later")
                        }
                    }
                    else {
                        throw new Error("Session expired, try again later")
                    }
                }
                else {
                    throw new Error("Can't fetch reviews, try again later")
                }
            }
            const result = await response.json();
            setReview(prev => ({...prev, [orderId]: result.review[0]}));
            return result
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchPastOrders = async () => {
            try {
                let response = await fetch("http://localhost:3000/order/user_history", {
                    headers: {
                        'Authorization': token ? `Bearer ${token}` : ' '
                    }
                });
                if(!response.ok) {
                    if(response.status === 401){
                        const refreshResponse = await fetchRefreshToken()
                        if(refreshResponse){
                            response = await fetch("http://localhost:3000/order/user_history", {
                                headers: {
                                    'Authorization': `Bearer ${refreshResponse.accessToken}`
                                }
                            });
                            if(!response.ok) {
                                throw new Error("Can't fetch past orders, try again later")
                            }
                        }
                        else {
                            throw new Error("Session expired, try again later")
                        }
                    }
                    else {
                        throw new Error("Can't fetch past orders, try again later")
                    }
                }
                const result = await response.json();
                setOrders(result.orders);
                result.orders.forEach(order => fetchReviewByOrderId(order._id))
                return result
            } catch (error) {
                console.error(error);
            }
        };
        fetchPastOrders();
    }, [fetchRefreshToken, token]);

    const updateReviewHandler = (orderId, updatedReview) => {
        setReview(prev => ({ ...prev, [orderId]: updatedReview }));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Past Orders</h1>
            <ul className="space-y-4">
                {orders === null && <p>Loading...</p>}
                {orders !== null && orders.length === 0 && <p>No orders placed yet</p>}
                {orders !== null && orders.length > 0 && orders.map(order => (
                    <li key={order._id} className="border rounded p-4 shadow">
                        <h1 className="font-semibold">ORDER #{order._id}</h1>
                        <p className="text-gray-700">from {order.restaurant.restaurantName}</p>
                        <p className="text-gray-700">Ordered on {formattedDate(order.createdAt)}</p>
                        <p className="text-gray-700">Total Paid: &#8377; {order.totalCost}</p>
                        <button type="button" className="mt-3 bg-orange-500 text-white py-2 px-3 rounded" onClick={() => openModalHandler(order._id)}>{review[order._id]? "View Review": "Save Review"}</button>
                        <AddReview ref={dialog} orderId={order._id} restaurantId={order.restaurant._id} existingReview={review[order._id]} updateReview={updateReviewHandler}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};
