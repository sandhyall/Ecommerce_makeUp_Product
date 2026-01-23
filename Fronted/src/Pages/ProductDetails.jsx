import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const useCustom = (initialValue) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  return { count, increment, decrement };
};

const ProductDetails = () => {
  const counter = useCustom(0);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const apiUrl = import.meta.env.VITE_API;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${apiUrl}/${id}`);
        setProduct(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id, apiUrl]);

  if (!product)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 w-full">
          <img
            src={`${import.meta.env.VITE_SERVER}/upload/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="lg:w-1/2 w-full flex flex-col justify-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="mb-3">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand || "-"}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
          </div>

          <p className="text-2xl font-bold text-gray-900 mb-6">
            NPR {product.price}
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <div className="flex items-center gap-4 my-4">
            <button
              onClick={counter.decrement}
              className="px-3 py-1 bg-pink-300 rounded"
            >
              -
            </button>

            <span className="text-lg font-semibold text-pink-800">{counter.count}</span>

            <button
              onClick={counter.increment}
              className="px-3 py-1 bg-pink-300 rounded"
            >
              +
            </button>
          </div>

          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
