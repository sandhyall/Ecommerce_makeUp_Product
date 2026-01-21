import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import OrderProduct from "./OrderProduct";
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_SERVERs;

const DashboardOrder = () => {
  const [summary, setSummary] = useState({
    Totalorder: 0,
    Pendingorder: 0,
    CompleteOrder: 0,
    CancleOrder: 0,
  });
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${apiUrl}/summary`);
      setSummary(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch summary");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-wrap gap-8">
        {/* Total Order */}
        <div className="flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 items-center gap-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <FaBagShopping />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Total Order</h2>
            <p className="text-2xl font-bold text-gray-900">{summary.Totalorder}</p>
          </div>
        </div>

        {/* Pending Order */}
        <div className="flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 items-center gap-6">
          <div className="bg-orange-100 text-orange-600 p-3 rounded-full text-2xl">
            <FaBagShopping />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Pending Order</h2>
            <p className="text-2xl font-bold text-gray-900">{summary.Pendingorder}</p>
          </div>
        </div>

        {/* Complete Order */}
        <div className="flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 items-center gap-6">
          <div className="bg-green-100 text-green-600 p-3 rounded-full text-2xl">
            <FaCheck />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Complete Order</h2>
            <p className="text-2xl font-bold text-gray-900">{summary.CompleteOrder}</p>
          </div>
        </div>

        {/* Cancel Order */}
        <div className="flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 items-center gap-6">
          <div className="bg-red-100 text-red-600 p-3 rounded-full text-2xl">
            <MdOutlineCancel />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Cancel Order</h2>
            <p className="text-2xl font-bold text-gray-900">{summary.CancleOrder}</p>
          </div>
        </div>
      </div>

      {/* Order Table Component */}
      <div className="mt-8">
        <OrderProduct />
      </div>
    </div>
  );
};

export default DashboardOrder;
