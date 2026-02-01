import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_SERVERs;

const OrderProduct = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiUrl}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  const handleReceive = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${apiUrl}/receive/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to receive order");
    }
  };

  const handleAssignShipping = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${apiUrl}/assign-shipping/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign shipping");
    }
  };

  const handleEdit = async (order) => {
    const newCustomer = prompt("Customer Name:", order.customerName);
    const newTotal = prompt("Total Price:", order.totalPrice);
    const newStatus = prompt(
      "Status (Pending, Received, In-Progress, Complete, Cancelled):",
      order.status
    );

    if (!newCustomer || !newTotal || !newStatus) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/edit/${order._id}`,
        {
          customerName: newCustomer,
          totalPrice: Number(newTotal),
          status: newStatus,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${apiUrl}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete order");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Order Management
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                ORDER ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Creator
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Receiver
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Shipper
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((o) => (
              <tr
                key={o._id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-4 py-3 text-sm text-gray-700">{o._id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {o.customerName}
                </td>
                <td
                  className={`px-4 py-3 text-sm font-semibold ${
                    o.status === "Complete"
                      ? "text-green-600"
                      : o.status === "Pending"
                      ? "text-yellow-600"
                      : o.status === "Cancelled"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {o.status}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {o.userId?.name || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {o.receivedBy?.name || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {o.assignedTo?.name || "-"}
                </td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  {o.status === "Pending" && !o.receivedBy && (
                    <button
                      onClick={() => handleReceive(o._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                    >
                      Receive
                    </button>
                  )}

                  {o.status === "Received" && !o.assignedTo && (
                    <button
                      onClick={() => handleAssignShipping(o._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                    >
                      Assign Shipping
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/admin/orders/view/${o._id}`)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEdit(o)}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(o._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderProduct;
