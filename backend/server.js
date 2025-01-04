const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the Express application
const app = express();

// Enable CORS
app.use(cors()); // Add this line to enable CORS for all routes

// Middleware to parse JSON data
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);       // User routes
app.use("/api/products", productRoutes); // Product routes
app.use("/api/cart", cartRoutes);        // Cart routes
app.use("/api/orders", orderRoutes);     // Order routes

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Root route (optional)
app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
