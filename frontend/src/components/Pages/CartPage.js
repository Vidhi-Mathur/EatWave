import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../store/Cart-Context";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../UI/Layout";
import { Content } from "../UI/Content";
import { Link } from "react-router-dom";
import EmptyPlate from '../../assets/EmptyPlate.jpg'
import { Card } from "../UI/Card";
import { IconButton, Tooltip } from "@mui/material";
import Info from "@mui/icons-material/Info";
import { ErrorDialog } from "../UI/ErrorDialog";

export const CartPage = () => {
    const { items, addToCart, removeFromCart, restaurantId, setFinalCost} = useContext(CartContext);
    const [restaurantData, setRestaurantData] = useState(null)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(true)

    const emptyCart = items.length === 0 ? EmptyPlate : null;

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await fetch(`https://eatwave-api.onrender.com/restaurant/${restaurantId}`);
                const result = await response.json();
                if (!response.ok) {
                    const errorMessages = result.errors ? result.errors.map(err => err.msg) : [result.message];
                    setErrors(errorMessages);
                    return;
                }
                setRestaurantData(result.restaurant);
                setLoading(false)
            } 
            catch(err) {
                setErrors([err.message || "Failed fetching cart, try again later"])
                setLoading(false)
            }
        };
    fetchRestaurantDetails();
    }, [restaurantId]);

    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const closeErrorDialogHandler = () => {
        setErrors(null)
    }
    
    let baseDeliveryFee = 50
    let deliveryFee = totalPrice > 500? 0: baseDeliveryFee
    let platformFee = 10
    let gstCharges = (totalPrice * 0.05).toFixed(2) //5%
    let packagingCharges = restaurantData?.packagingCharges || 0
    let gstAndRestaurantCharges = parseFloat(gstCharges) + packagingCharges
    let totalToPay = totalPrice + deliveryFee + platformFee + gstAndRestaurantCharges

    useEffect(() => {
        setFinalCost(totalToPay);
    }, [totalToPay])

    return (
        <Layout customisedImageUrl={emptyCart}>   
        {emptyCart? (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-lg text-center text-gray-700 mb-4">You can go to home page to view more restaurants</p>
              <Link to="/" className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out">SEE RESTAURANTS NEAR YOU</Link>
          </div>
        </Card>
        ): (
        <Content>
            {loading && (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            )}
            {errors && <ErrorDialog errors={errors} onClose={closeErrorDialogHandler}/>}
            {/* Restaurant details */}
            {restaurantData && (
                <Card className="mb-4 p-6">
                    <div className="flex items-center space-x-4">
                        <img src={restaurantData.imageUrls[0]}  alt={restaurantData.restaurantName} className="w-16 h-16 rounded-full" />
                        <div>
                            <h2 className="text-xl font-bold">{restaurantData.restaurantName}</h2>
                            <p className="text-gray-500">{restaurantData.address.street}, {restaurantData.address.city}</p>
                        </div>
                    </div>
                </Card>
            )} 
            {/* Order details */}
            <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                {items.map((item) => {
                    return (
                      <div key={item.id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4">
                          <div>
                              <h3 className="text-lg font-semibold">{item.name}</h3>
                              <p className="text-gray-800 mt-2">&#8377; {item.price}</p>
                          </div>
                          <div>
                              {item.quantity === 0 ? (
                                  <button onClick={() => addToCart({ itemId: item.id, name: item.name, price: item.price, currentRestaurantId: restaurantId })} className="bg-orange-100 px-4 py-3 rounded-md">ADD</button>) : (
                                  <div className="flex items-center">
                                      <button onClick={() => removeFromCart({ itemId: item.id })} className="bg-orange-100 px-3 py-2 rounded-md">
                                        <RemoveIcon />
                                      </button>
                                      <span className="px-4">{item.quantity}</span>
                                      <button onClick={() => addToCart({ itemId: item.id, name: item.name, price: item.price, currentRestaurantId: restaurantId })} className="bg-orange-100 px-3 py-2 rounded-md">
                                        <AddIcon />
                                      </button>
                                  </div>
                              )}
                          </div>
                      </div>
                    );
                })}
            </Card> 
            {/* Bill details */}
            <Card className="mt-6 p-4">
                <h2 className="text-xl font-semibold mb-4">Bill Details</h2>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Item Total</span>
                        <span className="mr-3">&#8377; {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Delivery Fee | {restaurantData?.address.street} </span>
                        <div className="flex items-center">
                            {deliveryFee === 0? (
                                <>
                                <span className="line line-through mr-1">&#8377; {baseDeliveryFee}</span>
                                <span className="text-green-500">FREE</span>
                                </>
                            ): (
                                <span>&#8377; {baseDeliveryFee}</span>
                            )}
                            <Tooltip title="Free delivery on orders above item total of &#8377; 500" placement="right" arrow>
                                <IconButton>
                                    <Info fontSize="small" className="text-gray-400 ml-1 cursor-pointer" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Platform Fee</span>
                        <div className="flex items-center">
                        <span className="mr-1">&#8377; {platformFee}</span>
                        <Tooltip title="Platform maintenance and support fee" placement="right" arrow>
                            <IconButton>
                                <Info fontSize="small" className="text-gray-400 ml-1 cursor-pointer" />
                            </IconButton>
                        </Tooltip>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>GST and Restaurant Charges</span>
                        <div className="flex items-center">
                        <span className="mr-1">&#8377; {gstAndRestaurantCharges}</span>
                        <Tooltip title={<div>GST on item total: &#8377; {gstCharges} <br /> Packaging Cost: &#8377; {packagingCharges}</div>} placement="right" arrow>
                            <IconButton>
                                <Info fontSize="small" className="text-gray-400 ml-1 cursor-pointer" />
                            </IconButton>
                        </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between font-semibold">
                  <span>TO PAY</span>
                  <span className="mr-2">₹{totalToPay}</span>
                </div>
              </div>
            </Card>      
            <div className="mt-6">
                <Link to="/order">
                    <button className="w-full py-3 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500 text-lg">
                        Order
                    </button>
                </Link>
            </div>
        </Content>
      )}
    </Layout>
  );
};