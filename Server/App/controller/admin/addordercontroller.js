const { ModelOrder } = require("../../model/ordermodel");


const Orderget = async (req, res) => {
  try {
    const orders = await ModelOrder.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch orders"
    });
  }
};


const CreateOrder = async (req, res) => {
  try {
    const {orderid,customer, total, status } = req.body;

    const newOrder = new ModelOrder({
      orderid,
      customer,
      total,
      status
    });

    await newOrder.save();

    res.status(201).json({
      status: true,
      message: "Order created successfully",
      data: newOrder
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Order creation failed"
    });
  }
};


const DeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await ModelOrder.findByIdAndDelete(id);

    res.status(200).json({
      status: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Failed to delete order"
    });
  }
};

const OrderEdit = async (req, res) => {
  const updateData = {
    orderid: req.body.orderid,
    customer:req.body.customer,
    total:req.body.total,
    status:req.body.status
  };
 const updated = await ModelOrder.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.send({ status: "success", data: updated });
};




const getSummary = async (req, res) => {
  try {
    const totalOrders = await ModelOrder.countDocuments();
    const completed = await ModelOrder.countDocuments({ status: "Complete" });
    const pending = await ModelOrder.countDocuments({ status: "Pending" });
    const cancelled = await ModelOrder.countDocuments({ status: "Cancelled" });

    res.status(200).json({
      totalOrders,
      completed,
      pending,
      cancelled
    });
  } catch (error) {
    res.status(500).json({
      message: "Summary fetch failed"
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const order = await ModelOrder.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  Orderget,
  CreateOrder,
  DeleteOrder,
  OrderEdit,
  getSummary,
  getSingleOrder
};
