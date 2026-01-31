import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setProducts([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/searchproduct/search?search=${encodeURIComponent(value)}`
      );

      if (Array.isArray(res.data)) {
        const uniqueProducts = res.data.filter(
          (item, index, self) => index === self.findIndex(t => t.name === item.name)
        );
        setProducts(uniqueProducts);
        setError("");
      } else {
        setProducts([]);
        setError("Search failed");
      }
    } catch (err) {
      console.error("Search error", err);
      setError("Search failed");
      setProducts([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={handleSearch}
        className="border px-3 py-2 w-full"
      />

      {error && <p className="text-red-500">{error}</p>}

      {products.length > 0 && (
        <div className="absolute bg-white shadow-md w-full mt-2 z-50">
          {products.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/product/${item._id}`)}
              className="p-3 border-b cursor-pointer hover:bg-gray-100"
            >
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm">Rs. {item.price}</p>
            </div>
          ))}
        </div>
      )}

      {products.length === 0 && search && (
        <p className="mt-2 text-gray-500">No product found</p>
      )}
    </div>
  );
};

export default Search;
