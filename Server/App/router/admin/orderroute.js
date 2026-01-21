const express = require("express");
const {
  Orderget,
  CreateOrder,
  DeleteOrder,
  getSummary,
  OrderEdit,
  getSingleOrder,
} = require("../../controller/admin/addordercontroller");

const OrderRoute = express.Router();

OrderRoute.get("/", Orderget);

OrderRoute.post("/create", CreateOrder);

OrderRoute.delete("/delete/:id", DeleteOrder);

OrderRoute.put("/Edit/:id", OrderEdit);

OrderRoute.get("/summary", getSummary);

OrderRoute.get("/:id", getSingleOrder);

module.exports = { OrderRoute };
