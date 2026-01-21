const AddproductModel = require("../../model/addproduct");

// ADD PRODUCT
const AddproductInsert = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const product = new AddproductModel({
      name,
      description,
      price,
      category,
      image: req.file ? req.file.filename : null,
    });

    await product.save();

    res.status(201).json({
      status: "success",
      msg: "Product added successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// GET PRODUCTS
const Addproductlists = async (req, res) => {
  try {
    const products = await AddproductModel.find().sort({ createdAt: -1 });
    res.json({ status: "success", data: products });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// DELETE PRODUCT
const Addproductdelete = async (req, res) => {
  try {
    await AddproductModel.findByIdAndDelete(req.params.id);
    res.json({ status: "success", msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// UPDATE PRODUCT
const AddproductEdit = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProduct = await AddproductModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      status: "success",
      msg: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ status: "error", msg: err.message });
  }
};

module.exports = {
  AddproductInsert,
  Addproductlists,
  Addproductdelete,
  AddproductEdit,
};
