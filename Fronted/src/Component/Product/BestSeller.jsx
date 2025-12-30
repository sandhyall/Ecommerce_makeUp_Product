import { useState } from "react";
import SimilaryProducts from "./SimilaryProducts";

const useCustom = (initialValue) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

  return { count, increment, decrement };
};

const BestSeller = () => {
  const counter = useCustom(0);

  const product = [
    {
      id: 1,
      name: "Matte Lipstick",
      category: "Lips",
      price: 1200,
      originalprice: 1500,
      images: [
        { url: "https://picsum.photos/200?random=1",
           alt: "Matte Lipstick 1" },
        { url: "https://picsum.photos/200?random=2", 
          alt: "Matte Lipstick 2" },
        { url: "https://picsum.photos/200?random=3",
           alt: "Matte Lipstick 3" },
      ],
    },
  ];

  const similarProducts = [
    {
      id: 1,
      name: "Matte Lipstick",
      category: "Lips",
      price: 1200,
      images: "https://picsum.photos/200?random=1",
    },
    {
      id: 2,
      name: "Liquid Lipstick",
      category: "Lips",
      price: 1500,
      images: "https://picsum.photos/200?random=2",
    },
    {
      id: 3,
      name: "Lip Gloss",
      category: "Lips",
      price: 900,
      images: "https://picsum.photos/200?random=3",
    },
    {
      id: 4,
      name: "Foundation",
      category: "Face",
      price: 2500,
      images: "https://picsum.photos/200?random=4",
    },
  ];

  const [mainImage, setMainImage] = useState(product[0].images[0].url);

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Best Seller</h2>

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg">
        <div className="hidden md:flex flex-row space-x-6">
          {product.map((item) => (
            <div key={item.id} className="flex space-x-4">
             
              <div className="flex flex-col space-y-4">
                {item.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={img.alt}
                    onClick={() => setMainImage(img.url)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                      mainImage === img.url
                        ? "border-pink-500"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>

            
              <div>
                <img
                  src={mainImage}
                  alt={item.name}
                  className="w-64 h-64 object-cover rounded-lg"
                />
              </div>

              
              <div className="md:w-1/2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="my-2 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>

                <p className="text-gray-500 line-through">
                  Rs. {item.originalprice}
                </p>
                <p className="text-black font-bold">Rs. {item.price}</p>
                <p className="text-gray-700">Category: {item.category}</p>

               
                <div className="flex space-x-2 mt-2 items-center">
                  <button
                    onClick={counter.increment}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>

                  <span>{counter.count}</span>

                  <button
                    onClick={counter.decrement}
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>

                  <button className="bg-pink-500 text-white px-5 py-2 rounded-md hover:bg-pink-600 transition duration-200">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <SimilaryProducts products={similarProducts}/>
    </div>
  );
};

export default BestSeller;
