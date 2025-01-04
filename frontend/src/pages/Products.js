import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(token, productId, quantity);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Products</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button className="btn btn-primary" onClick={() => handleAddToCart(product._id, 1)}>Add to Cart</button>
        </div>
      ))}
      <button className="btn btn-primary" onClick={goToCart}>Go to Cart</button>
    </div>
  );
};

export default Products;
