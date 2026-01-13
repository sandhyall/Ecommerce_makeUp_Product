import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProductForm from "./AddProductForm";
import ProductList from "./Productlist";

const apiUrl = import.meta.env.VITE_API;

const DashboardProduct = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

 
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/product-get`);
      fetchProducts();
      setProducts(res.data.data);
      setMessage(res.data.msg);
      setError("");
    } catch (err) {
     setError(err.response?.data?.msg || "Failed to  product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/delete-product/${id}`);
      setProducts(products.filter((item) => item._id !== id));
      setMessage("Product deleted successfully");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to delete product");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">My Store Dashboard</h1>

      <AddProductForm
        fetchProducts={fetchProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        setMessage={setMessage}
        setError={setError}
      />

      <ProductList
        products={products}
        handleDelete={handleDelete}
        setEditProduct={setEditProduct}
        message={message}
        error={error}
      />
    </div>
  );
};

export default DashboardProduct;
