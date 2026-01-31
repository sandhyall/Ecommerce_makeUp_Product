const AddProduct = require("../../model/addproduct")

const Searchget = async (req, res) => {
  try {
    const searchTerm = req.query.search;

    if (!searchTerm) {
      return res.status(200).json([]);
    }

    const products = await AddProduct.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } }
      ]
    }).limit(10); // optional

    res.status(200).json(products);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = Searchget;
