const express = require("express");
const OrderRoutes = express.Router();

const authMiddleware = require("../../Middleware/middle");
const {
  placeOrder,
  getUserOrders,
} = require("../../controller/admin/addordercontroller");

OrderRoutes.post("/place-order", authMiddleware, placeOrder);
OrderRoutes.get("/my-orders", authMiddleware, getUserOrders);

module.exports = OrderRoutes;
