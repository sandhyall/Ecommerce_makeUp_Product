import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Counter hook
const useCustom = (initialValue) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  return { count, increment, decrement, setCount };
};

const ProductDetails = () => {
  const counter = useCustom(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const apiUrl = import.meta.env.VITE_API;
  const cartApiUrl = import.meta.env.VITE_APIs;
  const serverUrl = import.meta.env.VITE_SERVER;

  const fetchProduct = async (productId) => {
  try {
    const res = await axios.get(`${apiUrl}/${productId}`);
    const fetchedProduct = res.data.data; 
    const similar = res.data.similarProducts || []; 
    fetchedProduct._id = fetchedProduct._id || fetchedProduct.id;
    setProduct(fetchedProduct);
    setSimilarProducts(similar);
    counter.setCount(1); 
    
  } catch (err) {
    console.error("Failed to fetch product:", err);
  }
};

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProduct(id);
  }, [id]);

  if (!product)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must login first!");
      navigate("/login");
      return;
    }

    if (!product._id) {
      alert("Product ID missing, cannot add to cart!");
      return;
    }

    try {
      const res = await axios.post(
        `${cartApiUrl}/add`,
        { productId: product._id, quantity: counter.count },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Product added to cart!");
      } else {
        alert(res.data.message || "Failed to add product to cart");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err.response?.data?.message || "Failed to add product to cart");

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 w-full">
          <img
            src={`${serverUrl}/upload/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>

        <div className="lg:w-1/2 w-full flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-1">Brand: {product.brand || "-"}</p>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-2xl font-bold mb-6">NPR {product.price}</p>

          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="flex items-center gap-4 my-4">
            <button
              onClick={counter.decrement}
              className="px-3 py-1 bg-pink-300 rounded"
            >
              -
            </button>
            <span className="text-lg font-semibold text-pink-800">
              {counter.count}
            </span>
            <button
              onClick={counter.increment}
              className="px-3 py-1 bg-pink-300 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            Add to cart
          </button>
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <div
                key={p._id}
                className="border p-3 rounded-lg shadow hover:shadow-md cursor-pointer"
                onClick={() => fetchProduct(p._id)}
              >
                <img
                  src={`${serverUrl}/upload/${p.image}`}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold">{p.name}</h3>
                <p className="text-pink-600 font-bold">NPR {p.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
