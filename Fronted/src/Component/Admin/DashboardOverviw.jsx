import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { CiDollar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

import SalesChart from "../Chart/SalesChart";
import OrdersChart from "../Chart/OrderStatus";
import TopProductsChart from "../Chart/TopProductsChart";
import axios from "axios";

const ServerUrl = import.meta.env.VITE_SERVER;

const DashboardOverview = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchOverview = async () => {
    try {
      
      const ordersRes = await axios.get(`${ServerUrl}/chart/overview`);
      setTotalOrders(ordersRes.data.TotalOrder || 0);
      setTotalRevenue(ordersRes.data.Revenue || 0); 

     
      const productsRes = await axios.get(`${ServerUrl}/chart/totalproduct`);
      setTotalProducts(productsRes.data.totalProducts || 0);

      
      const customersRes = await axios.get(`${ServerUrl}/chart/totalcustomer`);
      setTotalCustomers(customersRes.data.totalCustomers || 0);
    } catch (err) {
      console.error("Error fetching dashboard overview:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOverview();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-8 mb-6">
        <div className="flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <MdEmail />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Total Products</h2>
            <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
          </div>
        </div>

        <div className="flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <FaBagShopping />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>
        </div>

        <div className="flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <FaRegUser />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Total Customers</h2>
            <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
          </div>
        </div>

        <div className="flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <CiDollar />
          </div>
          <div>
            <h2 className="text-gray-600 text-sm">Sales Revenue</h2>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <OrdersChart />
      </div>

     
      <div className="mt-6">
        <TopProductsChart />
      </div>
    </div>
  );
};

export default DashboardOverview;
