import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Searchbar from "./Searchbar";

const apiUrl = import.meta.env.VITE_SERVERs;
const ServerUrl = import.meta.env.VITE_PAGE;

const OrderProduct = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showExtra, setShowExtra] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const fetchOrderspage = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `${ServerUrl}/orderpage?page=${pageNumber}&limit=10`,
      );
      setOrders(res.data.orders);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrderspage(page);
  }, [page]);

  const handleReceive = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/receive/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrderspage(page);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to receive order");
    }
  };

  const handleAssignShipping = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${apiUrl}/assign-shipping/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrderspage(page);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign shipping");
    }
  };

  const handleEdit = async (order) => {
    const newCustomer = prompt("Customer Name:", order.customerName);
    const newTotal = prompt("Total Price:", order.totalPrice);
    const newStatus = prompt(
      "Status (Pending, Received, In-Progress, Complete, Cancelled):",
      order.status,
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
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchOrderspage(page);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrderspage(page);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete order");
    }
  };
 const handleSearch = async (query) => {
    try {
      setSearchQuery(query);
      const token = localStorage.getItem("token");

      if (!query) {
        fetchOrderspage(1);
        return;
      }

      const res = await axios.get(`${apiUrl}/search?search=${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data);
      setPage(1);
      setTotalPages(1);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Search failed");
    }
  };
  

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (num) => setPage(num);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Order Management
      </h2>

      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
      <Searchbar onSearch ={handleSearch}/>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowExtra((prev) => !prev)}
          className="text-4xl text-blue-600 hover:text-blue-800"
          title="Show / Hide Actions"
        >
          <IoIosAddCircle />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              
              <th className="px-4 py-3">ORDER ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Creator</th>
              <th className="px-4 py-3">Receiver</th>
              <th className="px-4 py-3">Shipper</th>

              {showExtra && <th className="px-4 py-3">Actions</th>}
              {showExtra && <th className="px-4 py-3">Price</th>}
              {showExtra && <th className="px-4 py-3">Created At</th>}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((o) => (
              <tr key={o._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{o._id}</td>
                <td className="px-4 py-3">{o.customerName}</td>

                <td
                  className={`px-4 py-3 font-semibold ${
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

                <td className="px-4 py-3">{o.userId?.name || "-"}</td>
                <td className="px-4 py-3">{o.receivedBy?.name || "-"}</td>
                <td className="px-4 py-3">{o.assignedTo?.name || "-"}</td>

                {showExtra && (
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {o.status === "Pending" && !o.receivedBy && (
                        <button
                          onClick={() => handleReceive(o._id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Receive
                        </button>
                      )}

                      {o.status === "Received" && !o.assignedTo && (
                        <button
                          onClick={() => handleAssignShipping(o._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                        >
                          Assign
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/admin/orders/view/${o._id}`)}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEdit(o)}
                        className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(o._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                )}

                {showExtra && <td className="px-4 py-3">{o.totalPrice}</td>}

                {showExtra && (
                  <td className="px-4 py-3">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <button
          disabled={page === 1}
          onClick={handlePrev}
          className="px-3 py-1.5 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                page === pageNum
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={handleNext}
          className="px-3 py-1.5 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderProduct;
