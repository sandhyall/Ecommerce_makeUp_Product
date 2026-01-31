const express = require("express");
const {
  GetSalesOrder,
  GetOrderOverview,
  GetTopProduct,
} = require("../../controller/admin/chartController");

const ChartRoute = express.Router();

ChartRoute.get("/sold", GetSalesOrder);
ChartRoute.get("/overview", GetOrderOverview);
ChartRoute.get("/top", GetTopProduct);

module.exports = ChartRoute;
