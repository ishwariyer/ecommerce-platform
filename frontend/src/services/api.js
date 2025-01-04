import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const addProducts = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, userData);
    return response.data;
  } catch (error) {
    console.error('Error adding products:', error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addToCart = async (token, productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const fetchCart = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  const token = localStorage.getItem('token');
  console.log(token);
  try {
    const response = await axios.delete(`${API_URL}/users/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw error;
  }
};

export const placeOrder = async (token, shippingAddress) => {
  try {
    const response = await axios.post(
      `${API_URL}/orders/place`,
      { shippingAddress },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// Fetch user's past orders
export const fetchOrders = async () => {
  const token = localStorage.getItem('token');
  console.log(token);
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};