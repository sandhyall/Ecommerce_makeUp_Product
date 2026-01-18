const AddproductModel = require("../../model/addproduct");

const AddproductInsert = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const product = new AddproductModel({
      name,
      description,
      price,
      category,
      image: req.file ? req.file.filename : "",
    });

    await product.save();
    res.send({ status: "success", msg: "Product added", data: product });
  } catch {
    res.status(500).send({ status: "error", msg: "Insert failed" });
  }
};

const Addproductlists = async (req, res) => {
  const products = await AddproductModel.find();
  res.send({ status: "success", data: products });
};

const Addproductdelete = async (req, res) => {
  await AddproductModel.findByIdAndDelete(req.params.id);
  res.send({ status: "success", msg: "Product deleted" });
};

const AddproductEdit = async (req, res) => {
  const updateData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
  };

  if (req.file) updateData.image = req.file.filename;

  const updated = await AddproductModel.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.send({ status: "success", data: updated });
};

module.exports = {
  AddproductInsert,
  Addproductlists,
  Addproductdelete,
  AddproductEdit,
};
