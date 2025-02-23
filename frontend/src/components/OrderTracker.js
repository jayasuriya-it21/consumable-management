import React from 'react';
import { useAuth } from '../context/AuthContext';
import { updateOrderStatus } from '../api/orderApi';

const OrderTracker = ({ order }) => {
  const { user, token } = useAuth();

  const handleStatusUpdate = async (status) => {
    await updateOrderStatus(order._id, status, token);
  };

  return (
    <div>
      <p>Order ID: {order.orderId}</p>
      <p>Status: {order.status}</p>
      <p>Tracking History:</p>
      <ul>
        {order.trackingHistory.map((entry, idx) => (
          <li key={idx}>{entry.status} - {new Date(entry.date).toLocaleString()}</li>
        ))}
      </ul>
      {user.role === 'admin' && (
        <>
          <button onClick={() => handleStatusUpdate('delivered')}>Mark Delivered</button>
          {order.request.product.returnable && <button onClick={() => handleStatusUpdate('returned')}>Mark Returned</button>}
        </>
      )}
    </div>
  );
};

export default OrderTracker;