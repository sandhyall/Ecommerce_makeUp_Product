const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderid: {
    type: Number,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Complete", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
});

const ModelOrder = mongoose.model("Order", OrderSchema);

module.exports = { ModelOrder };
