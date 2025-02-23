import React, { useState } from 'react';
import { addProduct } from '../../api/productApi';
import { useAuth } from '../../context/AuthContext';

const ProductForm = ({ onProductAdded }) => {
  const { token } = useAuth();
  const [form, setForm] = useState({ productId: '', name: '', stock: '', images: '', returnable: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { ...form, images: form.images.split(','), stock: Number(form.stock) };
    await addProduct(product, token);
    onProductAdded();
    setForm({ productId: '', name: '', stock: '', images: '', returnable: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })} placeholder="Product ID" required />
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
      <input value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} type="number" placeholder="Stock" required />
      <input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} placeholder="Images (comma-separated URLs)" />
      <label>
        Returnable:
        <input type="checkbox" checked={form.returnable} onChange={(e) => setForm({ ...form, returnable: e.target.checked })} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;