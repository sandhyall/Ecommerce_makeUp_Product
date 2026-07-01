const Order = require("../../model/ordermodel");
const Cart = require("../../model/addcartmodel");
const User = require("../../model/usermodel");
const mongoose = require("mongoose");



const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const { name, phone, address, city } = req.body;

    const cartItems = await Cart.find({ userId }).populate("productId");
    if (!cartItems.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const items = cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.productId.price,
      0,
    );

    const order = await Order.create({
      userId,
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      customerCity: city,
      items,
      totalPrice,
    });

    await Cart.deleteMany({ userId });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId", "productName price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email location")
      .populate("receivedBy", "name email")
      .populate("assignedTo", "name email")
      .populate("items.productId", "productName price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Edit order status
const editOrder = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Order summary
const getOrderSummary = async (req, res) => {
  try {
    const total = await Order.countDocuments();
    const pending = await Order.countDocuments({ status: "Pending" });
    const received = await Order.countDocuments({ status: "Received" });
    const inProgress = await Order.countDocuments({ status: "In-Progress" });
    const complete = await Order.countDocuments({ status: "Complete" });
    const cancel = await Order.countDocuments({ status: "Cancelled" });

    res.json({
      TotalOrder: total,
      Pending: pending,
      Received: received,
      InProgress: inProgress,
      Complete: complete,
      Cancelled: cancel,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View single order
const orderview = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.productId")
      .populate("userId", "name email")
      .populate("receivedBy", "name email")
      .populate("assignedTo", "name email");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Receive order (Receiver)
const receiveOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    if (order.receivedBy)
      return res
        .status(400)
        .json({ success: false, message: "Order already received" });

    order.receivedBy = req.user.id;
    order.status = "Received";

    await order.save();
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Assign shipping (Shipper)
const assignShipping = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    if (!order.receivedBy)
      return res
        .status(400)
        .json({ success: false, message: "Order must be received first" });
    if (order.assignedTo)
      return res
        .status(400)
        .json({ success: false, message: "Order already assigned" });

    order.assignedTo = req.user.id;
    order.status = "In-Progress";

    await order.save();
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//search Order
const Searchorder = async (req, res) => {
  const { search } = req.query;

  try {
    let query = {};

    if (search) {
      const isObjectId = mongoose.Types.ObjectId.isValid(search);

      query = {
        $or: [
          ...(isObjectId ? [{ _id: search }] : []),
          { customerName: { $regex: search, $options: "i" } },
          { customerAddress: { $regex: search, $options: "i" } },
        ],
      };
    }

    const orders = await Order.find(query)
      .populate("userId", "name email")
      .populate("assignedTo", "name")
      .populate("receivedBy", "name")
      .populate("items.productId", "name price");

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  cancelOrder,
  getAllOrders,
  editOrder,
  deleteOrder,
  getOrderSummary,
  orderview,
  receiveOrder,
  assignShipping,
  Searchorder,
};
