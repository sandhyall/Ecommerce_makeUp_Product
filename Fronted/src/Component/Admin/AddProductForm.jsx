import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API;

const AddProductForm = ({
  fetchProducts,
  editProduct,
  setEditProduct,
  setMessage,
  setError,
}) => {
  const initialState = {
    name: "",
    description: "",
    price: "",
    category: "",
  };

  const [formProduct, setFormProduct] = useState(initialState);
  

 
  useEffect(() => {
    if (editProduct) {
      setFormProduct(editProduct);
    } else {
      setFormProduct(initialState);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({ ...formProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProduct) {
        await axios.put(
          `${apiUrl}/product-edit/${editProduct._id}`,
          formProduct
        );
        setMessage("Product updated successfully");
        setEditProduct(null);
      } else {
        await axios.post(`${apiUrl}/insert`, formProduct);
        setMessage("Product added successfully");
      }

      setError("");
      setFormProduct(initialState);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold text-center">
        {editProduct ? "Edit Product" : "Add Product"}
      </h2>

      <input
        name="name"
        value={formProduct.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="description"
        value={formProduct.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="number"
        name="price"
        value={formProduct.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="category"
        value={formProduct.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 border rounded"
        required
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        {editProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
