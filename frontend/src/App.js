import React from 'react';
import { BrowserRouter as Router, Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'; // Required for HistoryRouter
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ProductList from './pages/ProductList';
import OrderHistory from './pages/OrderHistory';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './utils/privateRoute';
import Navbar from './components/common/Navbar';

// Create history object for custom configuration
const history = createBrowserHistory();

function App() {
  return (
    <HistoryRouter history={history} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin-dashboard"
          element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>}
        />
        <Route
          path="/user-dashboard"
          element={<PrivateRoute role="user"><UserDashboard /></PrivateRoute>}
        />
        <Route
          path="/products"
          element={<PrivateRoute role="user"><ProductList /></PrivateRoute>}
        />
        <Route
          path="/order-history"
          element={<PrivateRoute><OrderHistory /></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute><ProfilePage /></PrivateRoute>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;