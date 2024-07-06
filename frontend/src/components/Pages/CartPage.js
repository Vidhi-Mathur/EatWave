import { useContext } from "react";
import { CartContext } from "../../store/Cart-Context";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../UI/Layout";
import Content from "../UI/Content";
import { NavLink, Link } from "react-router-dom";
import EmptyPlate from '../../assets/EmptyPlate.jpg'
import Card from "../UI/Card";

export const CartPage = () => {
  const { items, addToCart, removeFromCart } = useContext(CartContext);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const emptyCart = items.length === 0 ? EmptyPlate : null;

  return (
      <Layout customisedImageUrl={emptyCart}>   
      {emptyCart? (
        <Card className="p-6 bg-opacity-75">
          <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Your Cart is Empty</h1>
              <p className="text-lg text-center text-gray-700 mb-4">You can go to home page to view more restaurants</p>
              <Link to="/" className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out">SEE RESTAURANTS NEAR YOU</Link>
          </div>
        </Card>
        ): (
        <Content>
        <h2 className="text-2xl font-bold mb-4 pt-2 pl-2">Shopping Cart</h2>
        {items.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-800 mt-2">&#8377; {item.price}</p>
              </div>
              <div>
                {item.quantity === 0 ? (
                  <button onClick={() => addToCart({ itemId: item.id, name: item.name, price: item.price})} className="bg-orange-100 px-4 py-3 rounded-md">ADD</button>) : (
                  <div className="flex items-center">
                    <button onClick={() => removeFromCart({ itemId: item.id })} className="bg-orange-100 px-3 py-2 rounded-md">
                      <RemoveIcon />
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => addToCart({ itemId: item.id, name: item.name, price: item.price })} className="bg-orange-100 px-3 py-2 rounded-md">
                      <AddIcon />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="mt-8 pb-2 pl-2 flex justify-between">
        {totalPrice > 0 && (
          <>
          <h3 className="text-lg font-semibold">Total: &#8377;{totalPrice.toFixed(2)}</h3>
          <button className="py-2 px-6 mr-2 mb-4 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:bg-orange-500">
            <NavLink to="/order">Order</NavLink>
          </button>
          </>
        )}
      </div>
      </Content>
      )}
    </Layout>
  );
};