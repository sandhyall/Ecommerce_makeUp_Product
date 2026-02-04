const mongoose = require("mongoose");

const AddproductSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    brand: { type: String, default: "-" },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    color: { type: String, default: "N/A" },
    popularity: { type: Number, default: 0 },
    isNewArrival: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AddProduct", AddproductSchema);
