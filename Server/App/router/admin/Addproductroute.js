const express = require("express");
const { AddproductInsert, Addproductlists, Addproductdelete, AddproductEdit } = require("../../controller/admin/addproductcontroller");

const AddProductRoute = express.Router();

AddProductRoute.post("/insert", AddproductInsert);
AddProductRoute.get("/product-get", Addproductlists);
AddProductRoute.delete("/delete-product/:id",Addproductdelete)
AddProductRoute.put("/product-edit/:id",AddproductEdit )

module.exports = { AddProductRoute, };
