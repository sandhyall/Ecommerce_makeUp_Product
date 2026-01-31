const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number
});

const SearchProduct = mongoose.model("SearchProduct", productSchema);

module.exports = SearchProduct;
