import React from 'react';
import { approveRequest, rejectRequest } from '../../api/requestApi';
import { useAuth } from '../../context/AuthContext';

const RequestCard = ({ request, onAction }) => {
  const { token } = useAuth();

  const handleApprove = async () => {
    await approveRequest(request._id, token);
    onAction();
  };

  const handleReject = async () => {
    await rejectRequest(request._id, token);
    onAction();
  };

  return (
    <div>
      <p>Product: {request.product.name} | Quantity: {request.quantity}</p>
      <p>Description: {request.description}</p>
      <p>Status: {request.status}</p>
      {request.status === 'pending' && (
        <>
          <button onClick={handleApprove}>Approve</button>
          <button onClick={handleReject}>Reject</button>
        </>
      )}
    </div>
  );
};

export default RequestCard;