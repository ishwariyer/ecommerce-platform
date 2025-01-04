// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);

module.exports = router;
