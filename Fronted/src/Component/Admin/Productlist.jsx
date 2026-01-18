import React from "react";

const ProductList = ({
  products,
  handleDelete,
  setEditProduct,
  message,
  error,
}) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Available Products
      </h2>

      {message && <p className="text-green-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Category</th>
            <th className="p-2">Delete</th>
            <th className="p-2">Edit</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No products found
              </td>
            </tr>
          ) : (
            products.map((item) => (
              <tr key={item._id}>
                <td className="p-2">
                  {item.image ? (
                    <img
                      src={`${import.meta.env.VITE_SERVER}/upload/${item.image}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">Rs. {item.price}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="p-2">
                  <button
                    className="text-blue-500"
                    onClick={() => setEditProduct(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
