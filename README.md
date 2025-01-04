E-Commerce Platform

Project Overview

A full-stack e-commerce platform that includes user registration, login, adding products to a cart, and placing orders. This project is built using:

Backend: Node.js, Express.js, MongoDB, Mongoose

Frontend: React.js, Axios

Features

User registration and login with JWT-based authentication.

Products management.

Cart management for adding, updating, and removing items.

Order placement and retrieval.

Prerequisites

Node.js installed on your machine.

MongoDB (local or cloud-based, e.g., MongoDB Atlas).

Postman for API testing.

Installation

1. Clone the Repository

$ git clone https://github.com/your-repo-url/ecommerce-platform.git
$ cd ecommerce-platform

2. Backend Setup

Navigate to the backend folder:

$ cd backend

Install dependencies:

$ npm install

Create a .env file in the backend directory:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key

For uploading sample data into the database please run the below command first.

$  node seeder.js

Start the backend server:

$  node server.js 

The server will run at http://localhost:5000.

3. Frontend Setup

Navigate to the frontend folder:

$ cd ../frontend

Install dependencies:

$ npm install

Start the frontend server:

$ npm start

The React app will run at http://localhost:3000.

API Testing

Using Postman

Import the provided Postman collection JSON into Postman.

Set up environment variables:

{{base_url}} as http://localhost:5000.

{{token}} for JWT authentication (retrieved from the login response).

Key Endpoints

User Registration

URL: POST /api/users/register

Body (JSON):

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

User Login

URL: POST /api/users/login

Body (JSON):

{
  "email": "john@example.com",
  "password": "password123"
}

Add Product to Cart

URL: POST /api/cart

Headers: Authorization: Bearer {{token}}

Body (JSON):

{
  "productId": "your_product_id",
  "quantity": 2
}

Place Order

URL: POST /api/order

Headers: Authorization: Bearer {{token}}

Body (JSON):

{
  "shippingAddress": "123 Main Street, Cityville"
}

Notes

Replace your_mongo_db_connection_string with your MongoDB URI.

Replace your_jwt_secret_key with a strong secret.

Use appropriate product IDs from your database.

Troubleshooting

Common Issues

CORS Error

Ensure that CORS is enabled in your backend server.

Use the following code in server.js:

const cors = require('cors');
app.use(cors());

MongoDB Connection Issues

Verify your .env file contains the correct MONGO_URI.

Ensure MongoDB is running.

Contributions

Contributions are welcome! Please fork the repository and create a pull request.
