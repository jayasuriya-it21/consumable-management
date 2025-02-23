import React, { useState, useEffect } from 'react';
import RequestForm from '../components/user/RequestForm';
import { getProducts } from '../api/productApi';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getProducts(token);
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Request Product</h2>
      <RequestForm products={products} onRequestSubmitted={fetchProducts} />
    </div>
  );
};

export default UserDashboard;