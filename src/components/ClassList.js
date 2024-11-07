import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Import necessary methods

function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Initialize Firestore
        const db = getFirestore();

        // Reference to the 'classes' collection
        const classesCollection = collection(db, 'classes');

        // Fetch the snapshot of the 'classes' collection
        const classSnapshot = await getDocs(classesCollection);

        // Map through the snapshot and get the document data
        setClasses(classSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Class List</h2>
      <ul>
        {classes.map(classItem => (
          <li key={classItem.id}>{classItem.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
