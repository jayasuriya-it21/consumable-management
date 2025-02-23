import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, token } = useAuth();
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call to update profile if needed
    alert('Profile update not implemented yet');
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;