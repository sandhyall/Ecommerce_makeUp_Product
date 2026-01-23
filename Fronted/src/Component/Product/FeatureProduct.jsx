import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FeatureProduct = () => {
  const apiUrl = import.meta.env.VITE_API;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/feature`);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <Link to={`/product/${item._id}`}>
              <img
                src={`${import.meta.env.VITE_SERVER}/upload/${item.image}`}
                alt={item.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">Category: {item.category}</p>
              <p className="text-black">Rs. {item.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
