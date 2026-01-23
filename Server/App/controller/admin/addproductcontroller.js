const AddproductModel = require("../../model/addproduct");

// ADD PRODUCT
const AddproductInsert = async (req, res) => {
  try {
    const { name, description, price, category, isNewArrival } = req.body;

    const product = new AddproductModel({
      name,
      description,
      price,
      category,
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
    res.status(500).json({ status: "error", msg: err.message });
  }
};

// GET ALL PRODUCTS
const Addproductlists = async (req, res) => {
  try {
    const products = await AddproductModel.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: products });
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
      isNewArrival: req.body.isNewArrival 
    };

    if (req.file) updateData.image = req.file.filename;

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

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  try {
    const product = await AddproductModel.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.status(200).json({ status: "success", data: product });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET NEW ARRIVALS
const ArrivalProduct = async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const arrivalProducts = await AddproductModel.find({
      isNewArrival: true,
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: arrivalProducts });
  } catch (err) {
    console.error("ArrivalProduct error:", err); 
    res.status(500).json({ msg: "Server error" });
  }
};

const Featureproduct = async (req, res) => {
  try {
   

    const FeatureProducts = await AddproductModel.find({
     
      
    }).sort({ createdAt: -1 })
    .limit(10); 
    ;

    res.status(200).json({ data: FeatureProducts });
  } catch (err) {
    console.error("featureProduct error:", err); 
    res.status(500).json({ msg: "Server error" });
  }
};




module.exports = {
  AddproductInsert,
  Addproductlists,
  Addproductdelete,
  AddproductEdit,
  getSingleProduct,
  ArrivalProduct,
  Featureproduct
 
};
