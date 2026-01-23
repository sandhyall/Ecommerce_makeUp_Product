const mongoose = require("mongoose");

const AddproductSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    isNewArrival: { type: Boolean, default: true } ,
    isFeatureproduct: { type: Boolean, default: false}
  },
  { timestamps: true } 
);

module.exports = mongoose.model("AddProduct", AddproductSchema);



