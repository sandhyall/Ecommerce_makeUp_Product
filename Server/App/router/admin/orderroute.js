const express = require("express");
const OrderRoutes = express.Router();
const authMiddleware = require("../../Middleware/middle");

const {
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
} = require("../../controller/admin/addordercontroller");

// User routes
OrderRoutes.post("/place-order", authMiddleware, placeOrder);
OrderRoutes.get("/my-orders", authMiddleware, getUserOrders);
OrderRoutes.put("/cancel/:id", authMiddleware, cancelOrder);

// Admin routes
OrderRoutes.get("/all", authMiddleware, getAllOrders);
OrderRoutes.put("/edit/:id", authMiddleware, editOrder);
OrderRoutes.delete("/delete/:id", authMiddleware, deleteOrder);
OrderRoutes.get("/summary", authMiddleware, getOrderSummary);

// View order
OrderRoutes.get("/order-view/:id", authMiddleware, orderview);


OrderRoutes.put("/receive/:id", authMiddleware, receiveOrder);


OrderRoutes.put("/assign-shipping/:id", authMiddleware, assignShipping);

//order search
OrderRoutes.get("/search",authMiddleware, Searchorder);

module.exports = OrderRoutes;
