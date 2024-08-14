import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../store/Auth-Context";
import io from "socket.io-client";
import { getStatusIcon } from "../UI/StatusIcons"; 
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { ErrorDialog } from "../UI/ErrorDialog";

export const TrackOrder = () => {
    const { orderId } = useParams();
    const { token } = useContext(AuthContext);
    const [orderStatus, setOrderStatus] = useState('Placed');
    const [ errors, setErrors ] = useState(null)
    const [ loading, setLoading] = useState(true);
    const socket = useRef(null);

    useEffect(() => {
        //Establishing socket connection after configuring
        socket.current = io(process.env.REACT_APP_SERVER_URL, {
            auth: {
                token: `Bearer ${token}`
            },
            transports: ['websocket']
        });

        //To fetch initial order status
        const fetchOrderStatus = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/order/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json()
                if(!response.ok){
                    const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
                    setErrors(errorMessages);
                    setLoading(false);
                    return 
                }
                setOrderStatus(result.order.status)
            } 
            catch(err){
                setErrors(err.message || 'Error fetching order status')
                setLoading(false);
                return
            }
        };

        fetchOrderStatus()

        //Joining Order Room
        socket.current.emit('joinOrderRoom', orderId)
        //Listening for status updates
        socket.current.on('orderStatusUpdate', ({ status }) => {
            setOrderStatus(status);
            setLoading(false);
        });

        //Cleanup
        return () => {
            socket.current.disconnect();
            setLoading(false);
        }
    }, [orderId, token])

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }

    const statuses = ['Placed', 'Confirmed', 'Preparing', 'On the way', 'Delivered']
    const currentIndex = statuses.indexOf(orderStatus);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
            <h1 className="text-xl font-bold mb-6">Track Order #{orderId}</h1>
            {loading && <LoadingSpinner />}
            {!loading && <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between w-full z-10 relative">
                    {statuses.map((status, index) => (
                        <div key={status} className="flex flex-col items-center relative z-10">
                            <div className={`p-4 rounded-full ${index <= currentIndex ? "bg-orange-500" : "bg-gray-300"}`}>
                                {getStatusIcon(status, index <= currentIndex)}
                            </div>
                            <p className={`mt-2 text-md font-medium ${index <= currentIndex ? "text-orange-500" : "text-gray-500"}`}>
                                {status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}
