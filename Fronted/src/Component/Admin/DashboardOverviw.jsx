import { MdEmail } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { CiDollar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

const DashboardOverview = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="flex gap-8">
        <div className=" flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <MdEmail />
          </div>

          <div>
            <h2 className="text-gray-600 text-sm">Total Products</h2>
            <p className="text-2xl font-bold text-gray-900">120</p>
          </div>
        </div>

        <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <FaBagShopping />
          </div>

          <div>
            <h2 className="text-gray-600 text-sm">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-900">300</p>
          </div>
        </div>
        <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
           <FaRegUser />
          </div>

          <div>
            <h2 className="text-gray-600 text-sm">Total Customers</h2>
            <p className="text-2xl font-bold text-gray-900">85</p>
          </div>
        </div>
        <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <CiDollar />
          </div>

          <div>
            <h2 className="text-gray-600 text-sm">Sales Revenew</h2>
            <p className="text-2xl font-bold text-gray-900">$15,200</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardOverview;
