import { useState } from "react";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    { id: 1, name: "Face Powder", category: "powder" },
    { id: 2, name: "BB Cream", category: "cream" },
    { id: 3, name: "Red Lipstick", category: "lipstick" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <>
      <button onClick={() => setSelectedCategory("all")}>
        All Products
      </button>
      <button onClick={() => setSelectedCategory("powder")}>
        Powder
      </button>
      <button onClick={() => setSelectedCategory("cream")}>
        Cream
      </button>

      <hr />

      {filteredProducts.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </>
  );
}

export default Products;
