const Order = require("../../model/ordermodel");
const AddProduct =  require("../../model/addproduct")

const getOrderspage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .sort({ createdAt: -1 }) 
    .skip(skip)
    .limit(limit);

  const totalOrders = await Order.countDocuments();

  res.json({
    currentPage: page,
    totalPages: Math.ceil(totalOrders / limit),
    totalOrders,
    orders
  });
};

const getAllProductspage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20; 
  const skip = (page - 1) * limit;

  const products = await AddProduct.find()
    .skip(skip)
    .limit(limit);

  const totalProducts = await AddProduct.countDocuments();

  res.json({
    currentPage: page,
    totalPages: Math.ceil(totalProducts / limit),
    totalProducts,
    products
  });
};


module.exports ={getOrderspage,getAllProductspage}


