import React from 'react';
import AssignmentList from './AssignmentList';
import GradeViewer from './GradeViewer';
import Announcements from './Announcements';

function StudentDashboard() {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <AssignmentList />
      <GradeViewer />
      <Announcements />
    </div>
  );
}

export default StudentDashboard;
