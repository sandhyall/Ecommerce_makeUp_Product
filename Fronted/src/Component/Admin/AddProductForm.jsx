import React, { useEffect, useState } from "react";
import axios from "axios";

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

  // Populate form when editing
  useEffect(() => {
    if (editProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormProduct({
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
        category: editProduct.category,
      });
      setSelectedPhoto(null);
    } else {
      setFormProduct(initialState);
      setSelectedPhoto(null);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({ ...formProduct, [name]: value });
  };

  const handlePhoto = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API;

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
        // Update existing product
        await axios.put(`${apiUrl}/product-edit/${editProduct._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Product updated successfully");
        setEditProduct(null);
      } else {
        // Add new product
        await axios.post(`${apiUrl}/insert`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
        className="w-full p-2 border rounded"
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded">
        {editProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;
