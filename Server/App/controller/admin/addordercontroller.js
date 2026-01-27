const Order = require("../../model/ordermodel")
const Cart = require("../../model/addcartmodel")

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.find({ userId }).populate("productId");

    if (!cartItems.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const items = cartItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0
    );

    const order = await Order.create({
      userId,
      items,
      totalPrice,
    });

    await Cart.deleteMany({ userId });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("items.productId");

  res.json({ success: true, orders });
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders
};
