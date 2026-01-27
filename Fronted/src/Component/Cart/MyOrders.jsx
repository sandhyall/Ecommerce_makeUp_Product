import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const serverUrl = import.meta.env.VITE_SERVER;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${serverUrl}/order/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Fetched orders:", res.data.orders); // debug log
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* <h2 className="text-2xl font-bold mb-6">My Orders</h2> */}
      <Link to="/" className="text-2xl font-bold mb-6">My Orders</Link>
      

      {orders.length === 0 && (
        <p className="text-gray-500">You have no orders yet.</p>
      )}

      {orders.map((order) => (
        <div key={order._id} className="border rounded p-4 mb-6 shadow-sm">
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p
              className={`font-semibold ${
                order.status === "Pending"
                  ? "text-yellow-600"
                  : order.status === "Complete"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.status}
            </p>
          </div>

          {order.items.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center gap-4 border-b py-2"
            >
              <img
                src={`${serverUrl}/upload/${item.productId.image}`}
                alt={item.productId.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.productId.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                NPR {item.productId.price * item.quantity}
              </p>
            </div>
          ))}

        
          <div className="flex justify-end mt-4 font-bold">
            Total: NPR {order.totalPrice}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
