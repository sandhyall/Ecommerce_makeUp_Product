const express = require("express");
const {
  AddproductInsert,
  Addproductlists,
  Addproductdelete,
  AddproductEdit,
} = require("../../controller/admin/addproductcontroller");
const upload = require("../../Middleware/multer");

const router = express.Router();

router.post("/insert", upload.single("image"), AddproductInsert);
router.get("/product-get", Addproductlists);
router.delete("/delete-product/:id", Addproductdelete);
router.put("/product-edit/:id", upload.single("image"), AddproductEdit);

module.exports = { AddProductRoute: router };
