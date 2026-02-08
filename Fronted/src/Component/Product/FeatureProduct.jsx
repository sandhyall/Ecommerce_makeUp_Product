import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FeatureProduct = () => {
  const apiUrl = import.meta.env.VITE_API;
  const serverUrl = import.meta.env.VITE_SERVER;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/feature`);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl]);

  if (loading) {
    return <p className="text-center py-10">Loading featured products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center py-10">No featured products found.</p>;
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <Link to={`/product/${item._id}`}>
              <img
                src={
                  item.image
                    ? `${serverUrl}/upload/${item.image}`
                    : "/placeholder.png"
                }
                alt={item.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />

              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">
                Category: {item.category}
              </p>
              <p className="text-black font-bold">
                Rs. {item.price}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
