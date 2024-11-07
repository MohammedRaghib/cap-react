import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore methods

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use the signInWithEmailAndPassword method
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Initialize Firestore and fetch user document
      const db = getFirestore(); // Get the Firestore instance
      const userDocRef = doc(db, 'users', user.uid); // Get the document reference for the user's document
      const userDoc = await getDoc(userDocRef); // Fetch the document

      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (userData.role === 'teacher') {
          navigate('/teacher-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
