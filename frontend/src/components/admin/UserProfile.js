import React from 'react';

const UserProfile = ({ user }) => (
  <div>
    <p>Name: {user.name}</p>
    <p>Email: {user.email}</p>
    <p>Role: {user.role}</p>
  </div>
);

export default UserProfile;