// src/pages/Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {


  return (
    <div className="profile-container p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> </p>
        <p><strong>Email:</strong> </p>
        <p><strong>Address:</strong> </p>
        <p><strong>Phone Number:</strong> </p>
        <p><strong>Role:</strong> </p>
        {/* Tambahkan detail lain yang relevan */}
      </div>
    </div>
  );
};

export default Profile;
