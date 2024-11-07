import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Import Firestore functions

function Announcements() {
  const [announcement, setAnnouncement] = useState('');

  const postAnnouncement = async () => {
    try {
      const db = getFirestore(); // Initialize Firestore
      const announcementsCollection = collection(db, 'announcements'); // Get the 'announcements' collection reference

      // Add the new announcement to Firestore
      await addDoc(announcementsCollection, {
        message: announcement,
        timestamp: new Date()
      });

      setAnnouncement(''); // Clear the input field
      alert('Announcement posted!');
    } catch (error) {
      console.error('Error posting announcement:', error);
      alert('Failed to post announcement.');
    }
  };

  return (
    <div>
      <h2>Announcements</h2>
      <textarea
        value={announcement}
        onChange={(e) => setAnnouncement(e.target.value)}
        placeholder="Enter announcement text"
      />
      <button onClick={postAnnouncement}>Post Announcement</button>
    </div>
  );
}

export default Announcements;
