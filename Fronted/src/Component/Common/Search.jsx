import axios from "axios";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setProducts([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/searchproduct/search?search=${value}`
      );

      // Make sure res.data is array
      if (Array.isArray(res.data)) {
        setProducts(res.data);
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
    <div>
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={handleSearch}
      />

      {error && <p>{error}</p>}

      <div>
        {products.length === 0 && search && <p>No product found</p>}

        {products.map((item) => (
          <div key={item._id}>
            <h4>{item.name}</h4>
            <p>{item.category}</p>
            <p>Rs. {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
