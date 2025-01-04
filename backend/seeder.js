const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const seedProducts = async () => {
  await connectDB();

  const products = [
    { name: "Product 1", description: "Description 1", price: 100, stock: 10 },
    { name: "Product 2", description: "Description 2", price: 200, stock: 5 },
    { name: "Product 3", description: "Description 3", price: 300, stock: 20 },
  ];

  await Product.insertMany(products);
  console.log("Products seeded successfully");
  mongoose.connection.close();
};

seedProducts();
