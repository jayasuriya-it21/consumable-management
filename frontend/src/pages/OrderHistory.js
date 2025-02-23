import React, { useState, useEffect } from 'react';
import OrderTracker from '../components/OrderTracker';
import { getOrderHistory } from '../api/orderApi';
import { useAuth } from '../context/AuthContext';

const OrderHistory = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrderHistory(token);
      setOrders(data);
    };
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h1>Order History</h1>
      {orders.map(order => <OrderTracker key={order._id} order={order} />)}
    </div>
  );
};

export default OrderHistory;