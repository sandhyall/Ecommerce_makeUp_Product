const express = require("express");
const {
  AddproductInsert,
  Addproductlists,
  Addproductdelete,
  AddproductEdit,
  getSingleProduct,
  ArrivalProduct,
  Featureproduct,
  FilterAndSortProducts,
  searchProduct,
} = require("../../controller/admin/addproductcontroller");

const upload = require("../../Middleware/multer");
const Router = express.Router();

Router.post("/insert", upload.single("image"), AddproductInsert);
Router.get("/product-get", Addproductlists);


Router.get("/arrival", ArrivalProduct);
Router.get("/feature", Featureproduct);
Router.get("/filter",FilterAndSortProducts)
Router.get("/search",searchProduct)



Router.delete("/delete-product/:id", Addproductdelete);
Router.put("/product-edit/:id", upload.single("image"), AddproductEdit);

Router.get("/:id", getSingleProduct);




module.exports = Router;
