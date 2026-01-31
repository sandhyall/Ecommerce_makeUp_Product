import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_SERVER;
  const cartApiUrl = import.meta.env.VITE_APIs; 

  
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`${cartApiUrl}/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("Fetched cart:", res.data.cartItems);
      setCartItems(res.data.cartItems);
    } catch (error) {
      console.error("Failed to fetch cart", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  
  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate total
  const total = cartItems.reduce((acc, item) => {
    if (!item.productId) return acc; 
    return acc + item.productId.price * item.quantity;
  }, 0);

  return (
    <div className="p-4 max-w-md mx-auto">
      {cartItems.length === 0 && (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      {cartItems.map((item) => {
        if (!item.productId) return null;

        return (
          <div
            key={item._id}
            className="border p-4 mb-4 rounded flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={`${serverUrl}/upload/${item.productId.image}`}
                alt={item.productId.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h1 className="font-bold">{item.productId.name}</h1>
                <p className="text-sm text-gray-500">{item.productId.category}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-bold">NPR {item.productId.price * item.quantity}</p>
          </div>
        );
      })}

      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <p className="font-bold">Total</p>
        <p className="font-bold">NPR {total}</p>
      </div>

      {cartItems.length > 0 && (
        <button
          className="w-full mt-4 bg-pink-800 text-white rounded-lg px-4 py-2 hover:bg-yellow-500"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default CartButton;
