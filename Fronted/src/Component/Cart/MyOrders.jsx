import axios from "axios";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const serverUrl = import.meta.env.VITE_SERVER;

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${serverUrl}/order/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data.orders);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${serverUrl}/order/cancel/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    alert(res.data.message);
    setOrders((prev) => prev.map((o) => (o._id === id ? res.data.order : o)));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}
      {orders.map((order) => (
        <div key={order._id} className="border rounded p-4 mb-6 shadow-sm">
          <div className="flex justify-between mb-2">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p
              className={`font-semibold ${order.status === "Pending" ? "text-yellow-600" : order.status === "Complete" ? "text-green-600" : "text-red-600"}`}
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
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.productId.name}</h3>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                NPR {item.productId.price * item.quantity}
              </p>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-bold">
            <span>Total: NPR {order.totalPrice}</span>
            {order.status === "Pending" && (
              <button
                onClick={() => cancelOrder(order._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
