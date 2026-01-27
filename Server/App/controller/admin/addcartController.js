const Cart = require("../../model/addcartmodel");
const AddproductModel = require("../../model/addproduct");

// Add to Cart
const Cartinsert = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    // Validate input
    if (!productId || !quantity || !userId) {
      return res.status(400).json({ success: false, message: "Missing required data" });
    }

    // Check if product exists
    const productExists = await AddproductModel.findById(productId);
    if (!productExists) {
      return res.status(400).json({ success: false, message: "Product does not exist" });
    }

    // Check if product is already in the cart
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // Increment quantity if already in cart
      cartItem.quantity += Number(quantity);
      await cartItem.save();
    } else {
      // Add new cart item
      cartItem = new Cart({
        userId,
        productId,
        quantity: Number(quantity),
      });
      await cartItem.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: cartItem,
    });
  } catch (error) {
    console.error("Cart insert failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
      error: error.message,
    });
  }
};

// Get Cart
const GetCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const cartItems = await Cart.find({ userId }).populate(
      "productId",
      "name price image category"
    );

    console.log("Cart Items:", cartItems); // Debug log

    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (error) {
    console.error("GetCart failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

module.exports = { Cartinsert, GetCart };
