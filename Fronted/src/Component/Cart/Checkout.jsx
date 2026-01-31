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
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_SERVER;
  const cartApiUrl = import.meta.env.VITE_APIs;

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const res = await axios.get(`${cartApiUrl}/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCartItems(res.data.cartItems.filter((i) => i.productId !== null));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return alert("Cart is empty");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${serverUrl}/order/place-order`,
        { ...formData, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.data.success) {
        setCartItems([]);
        navigate("/thank-you");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  const totalPrice = cartItems.reduce(
    (t, i) => t + i.productId.price * i.quantity,
    0,
  );

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
          <div className="flex gap-4 items-center">
            <label>
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />{" "}
              COD
            </label>
            <label>
              <input
                type="radio"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
              />{" "}
              Online
            </label>
          </div>
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
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
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
          ))
        )}
        <div className="flex justify-between text-lg font-bold mt-4">
          <span>Total</span>
          <span>Rs. {totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
