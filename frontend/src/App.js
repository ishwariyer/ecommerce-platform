import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Order from './components/Order';

const App = () => {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart token={token} />} />
        <Route path="/order" element={<Order />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
