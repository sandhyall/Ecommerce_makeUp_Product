import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const DashboardOrder = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="flex gap-8">
        <div className=" flex max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-6">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full text-2xl">
            <FaBagShopping />
          </div>

          <div>
            <h2 className="text-gray-600 text-sm">Total Order</h2>
            <p className="text-2xl font-bold text-gray-900">1250</p>
          </div>
        </div>

        <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-3">
          <div className="bg-orange-400 text-blue-600 p-3 rounded-full text-2xl">
            <FaBagShopping />
          </div>

          <div>
            <h2 className="text-gray-600 text-sm">Pending Order</h2>
            <p className="text-2xl font-bold text-gray-900">32</p>
          </div>
        </div>
        <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-3">
          <div className="bg-green-400 text-blue-600 p-3 rounded-full text-2xl">
            <FaCheck />
          </div>

          <div>
            <h2 className="text-gray-600 text-sm">Complete Order</h2>
            <p className="text-2xl font-bold text-gray-900">1102</p>
          </div>
        </div>
        <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex items-center gap-3">
          <div className="bg-red-500 text-blue-600 p-3 rounded-full text-2xl">
            <MdOutlineCancel />
          </div>

          <div>
            <h2 className="text-gray-600 text-sm">Cancle Order</h2>
            <p className="text-2xl font-bold text-gray-900">16</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;
