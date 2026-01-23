const express = require("express");
const {
  AddproductInsert,
  Addproductlists,
  Addproductdelete,
  AddproductEdit,
  getSingleProduct,
  ArrivalProduct,
  Featureproduct,
} = require("../../controller/admin/addproductcontroller");

const upload = require("../../Middleware/multer");
const Router = express.Router();

Router.post("/insert", upload.single("image"), AddproductInsert);
Router.get("/product-get", Addproductlists);


Router.get("/arrival", ArrivalProduct);
Router.get("/feature", Featureproduct);
Router.get("/:id", getSingleProduct);

Router.delete("/delete-product/:id", Addproductdelete);
Router.put("/product-edit/:id", upload.single("image"), AddproductEdit);

module.exports = Router;
