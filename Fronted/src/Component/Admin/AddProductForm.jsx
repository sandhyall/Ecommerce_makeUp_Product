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
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({ ...formProduct, [name]: value });
  };

  const handlePhoto = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  useEffect(() => {
    if (editProduct) {
      setFormProduct({
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
        category: editProduct.category,
      });
    } else {
      setFormProduct(initialState);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formProduct.name);
      formData.append("description", formProduct.description);
      formData.append("price", formProduct.price);
      formData.append("category", formProduct.category);

      if (selectedPhoto) {
        formData.append("image", selectedPhoto);
      }

      if (editProduct) {
        await axios.put(
          `${apiUrl}/product-edit/${editProduct._id}`,
          formData
        );
        setMessage("Product updated successfully");
        setEditProduct(null);
      } else {
        await axios.post(`${apiUrl}/insert`, formData);
        setMessage("Product added successfully");
      }

      setError("");
      setFormProduct(initialState);
      setSelectedPhoto(null);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto space-y-4"
      encType="multipart/form-data"
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

      <input
        type="file"
        accept="image/*"
        onChange={handlePhoto}
        className="w-full border p-2 rounded"
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        {editProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
