const express = require("express");
const { Cartinsert, GetCart } = require("../../controller/admin/addcartController");
const authMiddleware = require("../../Middleware/middle");

const CartRoute = express.Router();

CartRoute.post("/add", authMiddleware, Cartinsert);
CartRoute.get("/get", authMiddleware, GetCart);

module.exports = { CartRoute };
