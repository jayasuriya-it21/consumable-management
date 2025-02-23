import React, { useState, useEffect } from 'react';
import ProductCard from '../components/user/ProductCard';
import { getProducts } from '../api/productApi';
import { useAuth } from '../context/AuthContext';

const ProductList = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(token);
      setProducts(data);
    };
    fetchProducts();
  }, [token]);

  return (
    <div>
      <h1>Available Products</h1>
      {products.map(product => <ProductCard key={product._id} product={product} />)}
    </div>
  );
};

export default ProductList;