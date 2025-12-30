import React from "react";
import { Link } from "react-router-dom";

const SimilarProducts = ({ products }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-10 mb-4">Similar Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="border rounded-lg p-4 hover:shadow-lg block"
          >
            <img
              src={Array.isArray(item.images) ? item.images[0] : item.images}
              alt={item.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />

            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">Category: {item.category}</p>
            <p className="text-black font-bold">Rs. {item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
