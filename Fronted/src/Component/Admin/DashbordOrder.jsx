import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import OrderProduct from "./OrderProduct";
import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames"; 

const apiUrl = import.meta.env.VITE_SERVERs;

const DashboardOrder = () => {
  const [summary, setSummary] = useState({
    TotalOrder: 0,
    Pending: 0,
    Received: 0,
    InProgress: 0,
    Complete: 0,
    Cancelled: 0,
  });
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiUrl}/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch summary");
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSummary();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

      {error && <p className="text-red-500 mb-6">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Orders"
          value={summary.TotalOrder}
          icon={<FaBagShopping />}
          color="blue"
        />
        <StatCard
          title="Pending Orders"
          value={summary.Pending}
          icon={<FaBagShopping />}
          color="orange"
        />
        <StatCard
          title="Received Orders"
          value={summary.Received}
          icon={<FaCheck />}
          color="purple"
        />
        <StatCard
          title="In Progress"
          value={summary.InProgress}
          icon={<FaCheck />}
          color="yellow"
        />
        <StatCard
          title="Completed Orders"
          value={summary.Complete}
          icon={<FaCheck />}
          color="green"
        />
        <StatCard
          title="Cancelled Orders"
          value={summary.Cancelled}
          icon={<MdOutlineCancel />}
          color="red"
        />
      </div>

      <div className="mt-10">
        <OrderProduct />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const iconBg = classNames({
    "bg-blue-100 text-blue-600": color === "blue",
    "bg-orange-100 text-orange-600": color === "orange",
    "bg-purple-100 text-purple-600": color === "purple",
    "bg-yellow-100 text-yellow-600": color === "yellow",
    "bg-green-100 text-green-600": color === "green",
    "bg-red-100 text-red-600": color === "red",
  });

  return (
    <div className="flex items-center p-5 bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
      <div className={`${iconBg} p-4 rounded-full text-3xl flex items-center justify-center`}>
        {icon}
      </div>
      <div className="ml-5">
        <h2 className="text-gray-500 text-sm">{title}</h2>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default DashboardOrder;
