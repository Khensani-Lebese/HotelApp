import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth, db } from '../firebaseConfig'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore'; // Import methods to fetch data

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serialNumber, setSerialNumber] = useState(''); // Serial number input
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Sign in the admin with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the admin's data from Firestore
      const adminDocRef = doc(db, "admins", user.uid);
      const adminDoc = await getDoc(adminDocRef);

      if (adminDoc.exists()) {
        const adminData = adminDoc.data();

        // Check if the entered serial number matches the one stored in Firestore
        if (adminData.serialNumber === serialNumber) {
          // Redirect to admin dashboard if serial number matches
          navigate('/admin/dashboard');
        } else {
          console.error("Invalid serial number");
        }
      } else {
        console.error("Admin data not found");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={serialNumber}
        onChange={e => setSerialNumber(e.target.value)}
        placeholder="Serial Number"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
