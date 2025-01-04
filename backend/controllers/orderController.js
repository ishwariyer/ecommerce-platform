const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.placeOrder = async (req, res) => {
  const userId = req.user._id; // From middleware
  const { shippingAddress } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      console.log(`Cart not found or empty for userId: ${userId}`);
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Log cart items to debug
    console.log("Cart items:", cart.items);

    let totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found for ID ${item.productId}` });
      }

      let totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found for ID ${item.productId}` });
      }
    }
      totalPrice += product.price * item.quantity;
    }

    console.log("Total price:", totalPrice);

    const order = new Order({
      userId,
      products: cart.items,
      totalPrice,
      shippingAddress,
    });

    await order.save();
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // From middleware

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const cart = await Cart.findOne({ userId }) || new Cart({ userId, items: [] });

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, productName: product.name, quantity, price: product.price });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};