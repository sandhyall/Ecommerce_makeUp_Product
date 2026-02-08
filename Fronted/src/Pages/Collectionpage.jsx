import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import FiltersideBar from "../Component/Product/FiltersideBar";
import SortFilter from "../Component/Product/SortFilter";

const Collectionpage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const apiUrl = import.meta.env.VITE_API;
  const serverUrl = import.meta.env.VITE_SERVER;
 

  const [searchParams] = useSearchParams();
  const fetchProducts = useCallback(async (pageNumber = 1, sortOption = "") => {
    try {
      setLoading(true);

      const query = searchParams.toString();
      let url = `${apiUrl}/product-get?page=${pageNumber}&limit=10`;
      if (query) url = `${apiUrl}/filter?${query}&page=${pageNumber}&limit=10`;
      if (sortOption) url += `&sort=${sortOption}`;

      const res = await axios.get(url);
      setProducts(res.data.data || res.data.products || []);
      setPage(res.data.currentPage || pageNumber);
      setTotalPages(res.data.totalPages || 1);
      setError("");
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, searchParams]);

  useEffect(() => {
    fetchProducts(page);
  }, [fetchProducts, page]);

  const fetchSortedProducts = (sortOption) => {
    fetchProducts(1, sortOption); 
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        All Products
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
       
        <div className="w-full lg:w-1/4">
          <FiltersideBar fetchProducts={() => fetchProducts(1)} />
          <div className="mt-6 lg:mt-0">
            <SortFilter fetchSortedProducts={fetchSortedProducts} />
          </div>
        </div>

       
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {loading ? (
            <p className="text-center col-span-full py-10">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center col-span-full text-gray-500 py-10">
              No products found
            </p>
          ) : (
            products.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition"
              >
                <Link to={`/product/${item._id}`}>
                  <img
                    src={
                      item.image
                        ? `${serverUrl}/upload/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.name}
                    className="w-full aspect-square object-cover rounded-md mb-3"
                  />
                </Link>

                <h2 className="font-medium text-base text-gray-900 leading-tight">
                  {item.name}
                </h2>
                <p className="text-xs text-gray-500">Brand: {item.brand || "-"}</p>
                <p className="text-xs text-gray-500">Category: {item.category}</p>
                <p className="font-semibold text-sm text-gray-900 mt-1">
                  NPR {item.price}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        <button
          disabled={page === 1}
          onClick={handlePrev}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`px-3 py-1 rounded ${
                page === pageNum
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={handleNext}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Collectionpage;
