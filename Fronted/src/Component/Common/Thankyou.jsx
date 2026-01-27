import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for shopping with us. Your order has been confirmed, and we are preparing it for shipment. 💄
        </p>

        <Link
          to="/my-orders"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
