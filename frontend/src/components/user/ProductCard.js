import React from 'react';

const ProductCard = ({ product }) => (
  <div>
    <h3>{product.name}</h3>
    <p>Stock: {product.stock}</p>
    <p>{product.returnable ? 'Returnable' : 'Non-Returnable'}</p>
    {product.images && product.images.map((img, idx) => <img key={idx} src={img} alt={product.name} width="100" />)}
  </div>
);

export default ProductCard;