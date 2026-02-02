import React from "react";
import { Link } from "react-router-dom";

const SimilarProducts = ({ products }) => {
  const serverUrl = import.meta.env.VITE_SERVER;

  if (!products || products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => {
          const productId = item._id || item.id;

          const imageUrl = Array.isArray(item.images)
            ? `${serverUrl}/upload/${item.images[0]}`
            : `${serverUrl}/upload/${item.image}`;

          return (
            <Link
              key={productId}
              to={`/product/${productId}`}
              className="border rounded-lg p-4 hover:shadow-lg transition block"
            >
              <img
                src={imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />

              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600 text-sm">
                Category: {item.category}
              </p>
              <p className="text-black font-bold mt-1">
                Rs. {item.price}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;
