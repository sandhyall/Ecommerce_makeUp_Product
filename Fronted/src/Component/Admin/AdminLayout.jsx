import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaBorderAll } from "react-icons/fa6";
import { TbCategory } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-300 shadow-lg text-gray-800">
        <div className="p-5 border-b font-bold text-lg">
          Admin Panel
        </div>

        <nav className="p-4 space-y-3">
          <NavLink to="/admin/overview" className="flex gap-3 p-2 rounded hover:bg-gray-100">
            <IoHome /> Dashboard
          </NavLink>

          <NavLink to="/admin/product" className="flex gap-3 p-2 rounded hover:bg-gray-100">
            <MdProductionQuantityLimits /> Products
          </NavLink>

          <NavLink to="/admin/orders" className="flex gap-3 p-2 rounded hover:bg-gray-100">
            <FaBorderAll /> Orders
          </NavLink>

          <NavLink to="/admin/categories" className="flex gap-3 p-2 rounded hover:bg-gray-100">
            <TbCategory /> Categories
          </NavLink>

          <NavLink to="/admin/users" className="flex gap-3 p-2 rounded hover:bg-gray-100">
            <FaRegUser /> Users
          </NavLink>

          <NavLink to="/admin/settings" className="flex gap-3 p-2 rounded hover:bg-gray-100">
            <CiSettings /> Settings
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full text-left p-2 rounded bg-red-400 text-white mt-4"
          >
            Logout
          </button>
        </nav>
      </aside>

   
      <main className="flex-1 p-6">
        <Outlet /> 
      </main>

    </div>
  );
};

export default AdminLayout;
