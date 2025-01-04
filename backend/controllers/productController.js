const Product = require("../models/Product");

// Fetch all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Retrieves all products from the database
    res.status(200).json(products); // Return all products in the response
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Fetch a single product by ID
const getProductById = async (req, res) => {
  const { id } = req.params; // Extract product ID from URL parameters

  try {
    const product = await Product.findById(id); // Find the product by its ID in the database
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // Return error if product not found
    }
    res.status(200).json(product); // Return product data in the response
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body; // Extract product details from the request body

  // Validate input data
  if (!name || !description || !price || !stock) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
    });

    // Save the new product to the database
    await newProduct.save();

    // Return success message with the newly created product
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params; // Extract product ID from URL parameters
  const { name, description, price, stock } = req.body; // Extract product details from the request body

  // Validate input data
  if (!name && !description && !price && !stock) {
    return res.status(400).json({ message: "Please provide at least one field to update" });
  }

  try {
    // Find the product by ID and update it with the provided fields
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock },
      { new: true } // Return the updated product instead of the old one
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" }); // Return error if product not found
    }

    // Return success message with the updated product
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};

module.exports = { getProducts, getProductById, addProduct, updateProduct };
