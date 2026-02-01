const express = require("express");
const {
  GetSalesOrder,
  GetOrderOverview,
  GetTopProduct,
  TotalProduct,
  TotalCustomer,
} = require("../../controller/admin/chartController");

const ChartRoute = express.Router();

ChartRoute.get("/sold", GetSalesOrder);
ChartRoute.get("/overview", GetOrderOverview);
ChartRoute.get("/top", GetTopProduct);
ChartRoute.get("/totalproduct",TotalProduct);
ChartRoute.get("/totalcustomer",TotalCustomer);

module.exports = ChartRoute;
