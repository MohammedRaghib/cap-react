import React from 'react';
import ManageUsers from './ManageUsers';
import ClassManager from './ClassManager';
import Announcements from './Announcements';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ManageUsers />
      <ClassManager />
      <Announcements />
    </div>
  );
}

export default AdminDashboard;
