import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', adminSecret: '', isAdmin: false });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, adminSecret, isAdmin } = form;
    try {
      await signUp(name, email, password, isAdmin ? adminSecret : '');
      navigate(isAdmin ? '/admin-dashboard' : '/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          type="email"
          required
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
          required
        />
        <label>
          Register as Admin:
          <input
            type="checkbox"
            checked={form.isAdmin}
            onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
          />
        </label>
        {form.isAdmin && (
          <input
            value={form.adminSecret}
            onChange={(e) => setForm({ ...form, adminSecret: e.target.value })}
            placeholder="Admin Secret"
            required={form.isAdmin}
          />
        )}
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
};

export default RegisterPage;