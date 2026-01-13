const mongoose = require("mongoose");

const AddproductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const AddproductModel = mongoose.model("AddProduct", AddproductSchema);

module.exports = AddproductModel;
