import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <nav>
      {user && (
        <>
          <Link to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'}>Dashboard</Link>
          {user.role === 'user' && <Link to="/products">Products</Link>}
          <Link to="/order-history">Order History</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;