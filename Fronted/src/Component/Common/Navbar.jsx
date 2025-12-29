import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-50 border-b">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-6 justify-center">
        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Powder
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Cream
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Pencil
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Gel
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Liquid
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Palette
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Minerals
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Highlighter
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Lipstick
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Lip Gloss
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Contour
        </Link>

        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-black transition"
        >
          Concealer
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
