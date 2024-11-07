import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import Firestore methods

function GradeViewer() {
  const [grades, setGrades] = useState([]);
  
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // Initialize Firestore
        const db = getFirestore();

        // Reference to the 'grades' collection
        const gradesCollection = collection(db, 'grades');

        // Fetch the snapshot of the 'grades' collection
        const gradeSnapshot = await getDocs(gradesCollection);

        // Map through the snapshot and get the document data
        setGrades(gradeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div>
      <h2>Your Grades</h2>
      <ul>
        {grades.map(grade => (
          <li key={grade.id}>
            {grade.subject}: {grade.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GradeViewer;
