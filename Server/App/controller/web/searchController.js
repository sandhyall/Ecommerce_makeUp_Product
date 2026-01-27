const SearchProduct = require("../../model/searchmodel");

const Searchget = async (req, res) => {
  try {
    const searchTerm = req.query.search || "";

    const filter = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } }
      ]
    };

    const products = await SearchProduct.find(filter);
    res.status(200).json(products); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = Searchget;
