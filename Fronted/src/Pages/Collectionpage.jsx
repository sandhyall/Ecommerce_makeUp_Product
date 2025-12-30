import React from "react";
import FiltersideBar from "../Component/Product/FiltersideBar";
import SortFilter from "../Component/Product/SortFilter";

const Collectionpage = () => {
  const product = [
    {
      id: 1,
      name: "Matte Lipstick",
      category: "Lips",
      brand: "Maybelline",
      price: 950,
      images: "https://picsum.photos/200?random=1",
    },
    {
      id: 2,
      name: "Liquid Lipstick",
      category: "Lips",
      brand: "Lakme",
      price: 1100,
      images: "https://picsum.photos/200?random=2",
    },
    {
      id: 3,
      name: "Hydrating Foundation",
      category: "Face",
      brand: "L’Oreal",
      price: 1800,
      images: "https://picsum.photos/200?random=3",
    },
    {
      id: 4,
      name: "BB Cream",
      category: "Face",
      brand: "Nykaa",
      price: 750,
      images: "https://picsum.photos/200?random=4",
    },
    {
      id: 5,
      name: "Eyeliner",
      category: "Eyes",
      brand: "Maybelline",
      price: 650,
      images: "https://picsum.photos/200?random=5",
    },
    {
      id: 6,
      name: "Mascara",
      category: "Eyes",
      brand: "Lakme",
      price: 900,
      images: "https://picsum.photos/200?random=6",
    },
    {
      id: 7,
      name: "Face Serum",
      category: "Skincare",
      brand: "L’Oreal",
      price: 2200,
      images: "https://picsum.photos/200?random=7",
    },
    {
      id: 8,
      name: "Moisturizer",
      category: "Skincare",
      brand: "Nykaa",
      price: 1200,
      images: "https://picsum.photos/200?random=8",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="font-bold text-2xl text-center my-6">All Products</h1>

      <div className="flex gap-6">
        <div className="w-1/4">
          <FiltersideBar />
        </div>

        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow-sm hover:shadow-md"
            >
                
                <img src={item.images} alt={item.name} />
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">Brand:{item.brand}</p>
              <p className="text-sm"> Category:{item.category}</p>
              <p className="font-bold mt-2">NPR: {item.price}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-6 ">
            <div className="w-1/4">
            <SortFilter/>

            </div>
             
        </div>
      </div>
    </div>
  );
};

export default Collectionpage;
