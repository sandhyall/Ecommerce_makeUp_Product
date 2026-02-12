const mongoose = require("mongoose");
const AddproductModel = require("../../model/addproduct");

const AddproductInsert = async (req, res) => {
  try {
    const { name, description, price, category, brand, color, isNewArrival } =
      req.body;

    const product = new AddproductModel({
      name,
      description,
      price,
      category,
      brand: brand || "-",
      color: color || "N/A",
      isNewArrival: true,

      image: req.file ? req.file.filename : null,
    });

    await product.save();

    res.status(201).json({
      status: "success",
      msg: "Product added successfully",
      data: product,
    });
  } catch (err) {
    console.error("AddproductInsert error:", err);
    res.status(500).json({ status: "error", msg: err.message });
  }
};

const Addproductlists = async (req, res) => {
  try {
    const products = await AddproductModel.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: products });
  } catch (err) {
    console.error("Addproductlists error:", err);
    res.status(500).json({ status: "error", msg: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await AddproductModel.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", msg: "Product not found" });
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    console.error("getSingleProduct error:", err);
    res.status(500).json({ status: "error", msg: "Server error" });
  }
};

const AddproductEdit = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      color: req.body.color,

      isNewArrival: req.body.isNewArrival,
    };

    if (req.file) updateData.image = req.file.filename;

    const updatedProduct = await AddproductModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    if (!updatedProduct)
      return res
        .status(404)
        .json({ status: "error", msg: "Product not found" });

    res.status(200).json({
      status: "success",
      msg: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("AddproductEdit error:", err);
    res.status(500).json({ status: "error", msg: err.message });
  }
};

const Addproductdelete = async (req, res) => {
  try {
    const deletedProduct = await AddproductModel.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedProduct)
      return res
        .status(404)
        .json({ status: "error", msg: "Product not found" });

    res.json({ status: "success", msg: "Product deleted successfully" });
  } catch (err) {
    console.error("Addproductdelete error:", err);
    res.status(500).json({ status: "error", msg: err.message });
  }
};

const ArrivalProduct = async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const arrivalProducts = await AddproductModel.find({
      isNewArrival: true,
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 });

    res.status(200).json({ status: "success", data: arrivalProducts });
  } catch (err) {
    console.error("ArrivalProduct error:", err);
    res.status(500).json({ status: "error", msg: "Server error" });
  }
};

const Featureproduct = async (req, res) => {
  try {
    const featureProducts = await AddproductModel.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ status: "success", data: featureProducts });
  } catch (err) {
    console.error("Featureproduct error:", err);
    res.status(500).json({ status: "error", msg: "Server error" });
  }
};

const FilterAndSortProducts = async (req, res) => {
  try {
    const { category, brand, color, sort } = req.query;

    const filter = {};
    if (category) filter.category = new RegExp(category, "i");
    if (brand) filter.brand = new RegExp(brand, "i");
    if (color) filter.color = new RegExp(color, "i");

    let sortOption = {};
    switch (sort) {
      case "priceAsc":
        sortOption = { price: 1 };
        break;
      case "priceDesc":
        sortOption = { price: -1 };
        break;
      case "popularityAsc":
        sortOption = { popularity: 1 };
        break;
      case "popularityDesc":
        sortOption = { popularity: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const products = await AddproductModel.find(filter).sort(sortOption);

    res.status(200).json({ status: "success", data: products });
  } catch (err) {
    console.error("FilterAndSortProducts error:", err);
    res.status(500).json({ status: "error", msg: err.message });
  }
};
//search product
const searchProduct = async (req, res) => {
  const { search } = req.query;

  try {
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
        ],
      };
    }

    const products = await AddproductModel.find(query);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  AddproductInsert,
  Addproductlists,
  Addproductdelete,
  AddproductEdit,
  getSingleProduct,
  ArrivalProduct,
  Featureproduct,
  FilterAndSortProducts,
  searchProduct
};
