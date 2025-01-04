import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  useEffect(() => {
    const fetchCart = async () => {
      try {
        console.log("Fetching cart with token:", token); // Log the token for debugging
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Cart response:", response.data); // Log the response for debugging
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Error fetching cart:", error.response || error.message);
        setError("Failed to fetch cart. Please try again.");
      }
    };
    fetchCart();
  }, [token]);

  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder(token, address);
      console.log("Order placed successfully:", response.data);
      navigate('/order');
    } catch (error) {
      console.error("Error placing order:", error.response || error.message);
      setError("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>
      {error && <p className="text-danger">{error}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="list-group mb-4">
          {cartItems.map((item) => (
            <li key={item.productId} className="list-group-item">
              {item.productName} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Shipping Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
