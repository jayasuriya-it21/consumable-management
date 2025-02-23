import React, { useState, useEffect } from 'react';
import ProductForm from '../components/admin/ProductForm';
import RequestCard from '../components/admin/RequestCard';
import { getProducts } from '../api/productApi';
import { getRequests } from '../api/requestApi';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
    const prodData = await getProducts(token);
    const reqData = await getRequests(token);
    setProducts(prodData);
    setRequests(reqData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Add Product</h2>
      <ProductForm onProductAdded={fetchData} />
      <h2>Manage Requests</h2>
      {requests.map(req => <RequestCard key={req._id} request={req} onAction={fetchData} />)}
    </div>
  );
};

export default AdminDashboard;