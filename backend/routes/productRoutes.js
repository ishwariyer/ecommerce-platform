const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Define routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.addProduct);
router.put("/:id", productController.updateProduct);

module.exports = router;  // Ensure you're exporting the router
