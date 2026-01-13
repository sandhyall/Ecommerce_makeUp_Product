const AddproductModel = require("../../model/addproduct");


const AddproductInsert = (req, res) => {
  const { name, description, price, category } = req.body;

  const addProduct = new AddproductModel({
    name,
    description,
    price,
    category,
  });

  addProduct
    .save()
    .then(() => {
      res.send({ status: "success", msg: "Product inserted successfully" });
    })
    .catch(() => {
      res.send({ status: "error", msg: "Failed to insert product" });
    });
};


const Addproductlists = async (req, res) => {
  try {
    const products = await AddproductModel.find();
    res.send({
      status: "success",
      msg: "Product list fetched successfully",
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.send({ status: "error", msg: "Failed to fetch products" });
  }
};


const Addproductdelete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await AddproductModel.deleteOne({ _id: id });

    if (deleted.deletedCount === 0) {
      return res.status(404).send({ status: "error", msg: "Product not found" });
    }

    res.send({ status: "success", msg: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "error", msg: "Failed to delete product" });
  }
};


const AddproductEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, category } = req.body;

    const edit = await AddproductModel.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true } 
    );

    if (!edit) {
      return res.status(404).send({ status: "error", msg: "Product not found" });
    }

    res.send({ status: "success", msg: "Product updated successfully", data: edit });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: "error", msg: "Failed to update product" });
  }
};

module.exports = { AddproductInsert, Addproductlists, Addproductdelete, AddproductEdit };
