import React from "react";
import { product } from "../Product/ProductList";
import { Link } from "react-router-dom";


const FeatureProduct = () => {
      
  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
             <Link to={`/product/${item._id}`}>
              <img
              src={item.images}
              alt={item.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">Category: {item.category}</p>
            <p className="text-black ">Rs. {item.price}</p>
            <button
              className="bg-pink-500 text-white px-5 py-2 rounded-md 
                     hover:bg-pink-600 transition duration-200"
                     
            >
              See Details
            </button>
             </Link>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
