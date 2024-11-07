import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'; // Import necessary Firestore functions

function ManageUsers() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch teachers and students from Firebase
    const fetchUsers = async () => {
      try {
        const db = getFirestore(); // Get Firestore instance

        // Create queries for teachers and students based on their roles
        const teacherQuery = query(collection(db, 'users'), where('role', '==', 'teacher'));
        const studentQuery = query(collection(db, 'users'), where('role', '==', 'student'));

        // Fetch teacher and student documents
        const teacherSnapshot = await getDocs(teacherQuery);
        const studentSnapshot = await getDocs(studentQuery);

        // Map documents to state
        setTeachers(teacherSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setStudents(studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Manage Users</h2>
      <h3>Teachers</h3>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher.id}>{teacher.email}</li>
        ))}
      </ul>
      <h3>Students</h3>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
