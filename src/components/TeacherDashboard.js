import React from 'react';
import ClassList from './ClassList';
import AssignmentManager from './AssignmentManager';
import GradeBook from './GradeBook';

function TeacherDashboard() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <ClassList />
      <AssignmentManager />
      <GradeBook />
    </div>
  );
}

export default TeacherDashboard;
