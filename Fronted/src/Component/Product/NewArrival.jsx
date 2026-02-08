import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const scrollRef = useRef(null);
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/arrival`);
        setProducts(res.data.data );
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  const handleLeft = () => (scrollRef.current.scrollLeft -= 300);
  const handleRight = () => (scrollRef.current.scrollLeft += 300);

  return (
    <div className="max-w-9xl mx-auto px-8 py-3 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">New Arrivals</h2>

      <button
        onClick={handleLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 shadow rounded-full z-10"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={handleRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 shadow rounded-full z-10"
      >
        <FaChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white min-w-[200px] flex-shrink-0 overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Link to={`/product/${item._id}`}>
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_SERVER}/upload/${item.image}`}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  New
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <h4 className="font-semibold text-gray-800">
                  Category: {item.category}
                </h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
