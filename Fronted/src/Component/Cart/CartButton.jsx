import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 1200,
      category: "Face",
      image: "https://picsum.photos/200?random=1",
      qty: 1
    },
    {
      id: 2,
      name: "Product 2",
      price: 1300,
      category: "Lips",
      image: "https://picsum.photos/200?random=2",
      qty: 2
    }
  ];
  const navigate = useNavigate(); 
  const handleCheckout = () => {
    navigate("/Checkout"); 
  };

  // Calculate total
  const total = products.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-4 max-w-md mx-auto">
      {products.map((item) => (
        <div key={item.id} className="border p-4 mb-4 rounded flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <h1 className="font-bold">{item.name}</h1>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
            </div>
          </div>
          <p className="font-bold">NPR {item.price}</p>
        </div>
      ))}

      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <p className="font-bold">Total</p>
        <p className="font-bold">NPR {total}</p>
      </div>

      <button className="w-full mt-4 bg-pink-800 text-white rounded-lg px-4 py-2 hover:bg-yellow-500" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default CartButton;
