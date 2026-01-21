import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_SERVERs;

const View = () => {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${apiUrl}/${id}`);
      setOrder(res.data);
      setError("");
    } catch (err) {
   setError(err.response?.data?.msg || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrder();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Order View</h1>

      <p><b>Order ID:</b> {order.orderid}</p>
      <p><b>Customer:</b> {order.customer}</p>
      <p><b>Total:</b> Rs. {order.total}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Created At:</b> {new Date(order.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default View;
