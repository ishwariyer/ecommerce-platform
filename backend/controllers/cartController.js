const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // From middleware

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, productName: product.name, quantity, price: product.price });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  const userId = req.user._id; // From middleware

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log(`Cart not found for userId: ${userId}`);
      return res.status(404).json({ message: "Cart is empty" });
    }

    console.log("Retrieved cart:", cart); // Log the cart to debug
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ error: error.message });
  }
};