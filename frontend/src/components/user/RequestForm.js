import React, { useState } from 'react';
import { createRequest } from '../../api/requestApi';
import { useAuth } from '../../context/AuthContext';
import { validateStock } from '../../utils/validateForm';

const RequestForm = ({ products, onRequestSubmitted }) => {
  const { token } = useAuth();
  const [form, setForm] = useState({ productId: '', quantity: '', description: '', fromDate: '', toDate: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedProduct = products.find(p => p._id === form.productId);
    if (!validateStock(form.quantity, selectedProduct.stock)) {
      alert('Requested quantity exceeds available stock');
      return;
    }
    const request = {
      ...form,
      quantity: Number(form.quantity),
      fromDate: new Date(form.fromDate),
      toDate: selectedProduct.returnable ? new Date(form.toDate) : undefined,
    };
    await createRequest(request, token);
    onRequestSubmitted();
    setForm({ productId: '', quantity: '', description: '', fromDate: '', toDate: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })} required>
        <option value="">Select Product</option>
        {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>
      <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} type="number" placeholder="Quantity" required />
      <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Purpose" required />
      <input value={form.fromDate} onChange={(e) => setForm({ ...form, fromDate: e.target.value })} type="date" required />
      {form.productId && products.find(p => p._id === form.productId)?.returnable && (
        <input value={form.toDate} onChange={(e) => setForm({ ...form, toDate: e.target.value })} type="date" required />
      )}
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestForm;