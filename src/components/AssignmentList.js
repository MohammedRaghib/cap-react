import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import modular Firestore methods
import { db } from '../firebaseConfig'; // Ensure db is initialized in firebaseConfig

function AssignmentList() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const firestoreDb = getFirestore(); // Initialize Firestore instance
      const assignmentsCollection = collection(firestoreDb, 'assignments'); // Reference to 'assignments' collection

      try {
        const assignmentsSnapshot = await getDocs(assignmentsCollection); // Fetch documents from collection
        setAssignments(assignmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Map docs to state
      } catch (error) {
        console.error('Error fetching assignments:', error.message);
      }
    };

    fetchAssignments(); // Call the function to fetch assignments
  }, []);

  return (
    <div>
      <h2>Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>{assignment.title}</li> // Render assignment title
        ))}
      </ul>
    </div>
  );
}

export default AssignmentList;
