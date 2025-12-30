import React from "react";
import { Link } from "react-router-dom";
import Search from "../Common/Search";
import { FaBagShopping } from "react-icons/fa6";

const Topbar = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 ">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-600 capitalize">Sandhya</h1>

        <nav className="flex items-center gap-10">
         
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 font-medium hover:text-black transition"
            >
              Category
            </Link>
            <Link
              to="/"
              className="text-gray-600 font-medium hover:text-black transition"
            >
              All Products
            </Link>
            <Link
              to="/"
              className="text-gray-600 font-medium hover:text-black transition"
            >
              Blogs
            </Link>
            <Link
              to="/"
              className="text-gray-600 font-medium hover:text-black transition"
            >
              Contacts
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Search />
            <FaBagShopping className="text-xl text-pink-600 cursor-pointer hover:text-black transition" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Topbar;
