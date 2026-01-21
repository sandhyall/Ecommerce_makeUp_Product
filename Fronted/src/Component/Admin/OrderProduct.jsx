import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_SERVERs;

const OrderProduct = () => {
  const [orders, setOrders] = useState([]);
 
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${apiUrl}/`);
      setOrders(res.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch orders");
    }
  };


  // const fetchSummary = async () => {
  //   try {
  //     const res = await axios.get(`${apiUrl}/summary`);
  //     setSummary(res.data);
  //   } catch (err) {
  //     setError(err.response?.data?.msg || "Failed to fetch summary");
  //   }
  // };

  useEffect(() => {
    
    fetchOrders();
    // fetchSummary();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/delete/${id}`);
      fetchOrders(); 
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to delete order");
    }
  };
const handleEdit = async (order) => {
  const newCustomer = prompt("Customer Name:", order.customer);
  const newTotal = prompt("Total Price:", order.total);
  const newStatus = prompt("Status (Pending, Complete, Cancelled):", order.status);

  if (!newCustomer || !newTotal || !newStatus) return;

  try {
    await axios.put(`${apiUrl}/Edit/${order._id}`, {
      customer: newCustomer,
      total: Number(newTotal),
      status: newStatus,
    });
    fetchOrders(); 
  } catch (err) {
   
    console.error(err);
  }
};


 
  const handleCreate = async (newOrder) => {
    try {
      await axios.post(`${apiUrl}/create`, newOrder);
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create order");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Management</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ORDER ID</th>
            <th className="border px-4 py-2 text-left">Customer</th>
            <th className="border px-4 py-2 text-left">Total Price</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{o.orderid}</td>
              <td className="border px-4 py-2">{o.customer}</td>
              <td className="border px-4 py-2">Rs. {o.total}</td>
              <td
                className={`border px-4 py-2 font-semibold ${
                  o.status === "Complete"
                    ? "text-green-600"
                    : o.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {o.status}
              </td>
              <td className="border px-4 py-2 flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                 onClick={() => navigate(`orders/view/${o._id}`)}
                >
                  View
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(o._id)}
                >
                  Delete
                </button>
                <button className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600"
                 onClick={() => handleEdit(o)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderProduct;
