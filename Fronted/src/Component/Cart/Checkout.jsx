import React, { useState } from "react";

const Checkout = () => {
  const cartItems = [
    {
      id: 1,
      name: "Matte Lipstick",
      price: 1200,
      qty: 1,
      image: "https://picsum.photos/100?random=1",
    },
    {
      id: 2,
      name: "Face Cream",
      price: 1500,
      qty: 2,
      image: "https://picsum.photos/100?random=2",
    },
  ];

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
    console.log("Order Details:", formData, cartItems);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      
      {/* Shipping Details */}
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

      {/* Order Summary */}
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 mb-4 border-b pb-2"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm">Qty: {item.qty}</p>
            </div>
            <p className="font-semibold">
              Rs. {item.price * item.qty}
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
