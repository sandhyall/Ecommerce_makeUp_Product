import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const serverUrl = import.meta.env.VITE_SERVERs; // backend API
const ServerUrles = import.meta.env.VITE_SERVER; // for product image URL

const ViewPage = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/order-view/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrder(res.data.order);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch order");
      }
    };

    fetchOrder();
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!order) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">
        Order Details
      </h1>

      {/* Customer / Shipping Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer / Shipping Details</h2>
        <p><strong>Name:</strong> {order.customerName}</p>
        <p><strong>Phone:</strong> {order.customerPhone}</p>
        <p><strong>Address:</strong> {order.customerAddress}, {order.customerCity}</p>
        {order.userId && (
          <p><strong>Email:</strong> {order.userId.email}</p>
        )}
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total Price:</strong> Rs. {order.totalPrice}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white text-xs ${
              order.status === "Complete"
                ? "bg-green-500"
                : order.status === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {order.status}
          </span>
        </p>
        <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* Products */}
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border p-4 rounded"
          >
            <img
              src={`${ServerUrles}/upload/${item.productId.image}`}
              alt={item.productId.productName}
              className="w-20 h-20 object-cover rounded border"
            />

            <div className="flex-1">
              <p className="font-semibold">{item.productId.productName}</p>
              <p className="text-sm text-gray-600">Price: Rs. {item.productId.price}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>

            <p className="font-bold">Rs. {item.productId.price * item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <button
        className="mt-6 bg-gray-800 text-white px-6 py-2 rounded hover:bg-black"
        onClick={() => navigate("/admin/orders")}
      >
        ← Back to Orders
      </button>
    </div>
  );
};

export default ViewPage;
