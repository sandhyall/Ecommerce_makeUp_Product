import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

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

      setCartItems(
        res.data.cartItems.filter((item) => item.productId !== null)
      );
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

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
     
      const res = await axios.post(
        `${serverUrl}/order/place-order`,
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
       
        setCartItems([]);
      
        navigate("/thank-you");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

 
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
    
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Place Order
          </button>
        </form>
      </div>

      
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {cartItems.length === 0 && (
          <p className="text-gray-500">Your cart is empty.</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 mb-4 border-b pb-2"
          >
            <img
              src={`${serverUrl}/upload/${item.productId.image}`}
              alt={item.productId.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.productId.name}</h3>
              <p className="text-sm">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">
              Rs. {item.productId.price * item.quantity}
            </p>
          </div>
        ))}

        <div className="flex justify-between text-lg font-bold mt-4">
          <span>Total</span>
          <span>Rs. {totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
